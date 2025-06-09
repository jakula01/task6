const express = require("express");
const cors = require("cors");
const presentationsRoutes = require("./routes/presentations");
const http = require("http");
const WebSocket = require("ws");
const app = express();
const PORT = process.env.PORT || 5000;

// Создаем WebSocket-сервер на том же HTTP-сервере

// Хранение пользователей по презентациям
const presentationsUsers = {};
app.use(
  cors({
    origin: "https://buildtask6.vercel.app",
  })
);
app.use(express.json());
app.use("/api/presentations", presentationsRoutes);
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
wss.on("connection", (ws) => {
  let currentPresentationId = null;
  let currentUsername = null;

  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message);

      if (data.type === "join_presentation") {
        currentPresentationId = data.presentationId;
        currentUsername = data.username;

        if (!presentationsUsers[currentPresentationId]) {
          presentationsUsers[currentPresentationId] = new Set();
        }
        presentationsUsers[currentPresentationId].add(currentUsername);

        broadcastUsersList(currentPresentationId);
      }

      if (data.type === "leave_presentation") {
        if (
          currentPresentationId &&
          presentationsUsers[currentPresentationId]
        ) {
          presentationsUsers[currentPresentationId].delete(currentUsername);
          broadcastUsersList(currentPresentationId);
        }
      }

      // Добавляем сюда обработку обновления рисунка
      if (data.type === "drawing_update") {
        const { presentationId, paths } = data;
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({
                type: "drawing_update",
                presentationId,
                paths,
              })
            );
          }
        });
      }
    } catch (e) {
      console.error("Failed to parse message", e);
    }
  });

  ws.on("close", () => {
    if (currentPresentationId && presentationsUsers[currentPresentationId]) {
      presentationsUsers[currentPresentationId].delete(currentUsername);
      broadcastUsersList(currentPresentationId);
    }
  });

  function broadcastUsersList(presentationId) {
    const users = Array.from(presentationsUsers[presentationId] || []);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            type: "users_list",
            presentationId,
            users,
          })
        );
      }
    });
  }
});

server.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
