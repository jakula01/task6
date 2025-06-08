import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function UserList({ presentationId }) {
  const { username } = useContext(UserContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:5000");

    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          type: "join_presentation",
          presentationId, // <-- здесь правильно использовать presentationId
          username,
        })
      );
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (
        data.type === "users_list" &&
        data.presentationId === presentationId
      ) {
        setUsers(data.users); // <-- тут setUsers вместо setUsersOnPage
      }
    };

    // Можно не сохранять socket в состояние, если не планируешь его использовать вне useEffect

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(
          JSON.stringify({
            type: "leave_presentation",
            presentationId,
            username,
          })
        );
      }
      socket.close();
    };
  }, [presentationId, username]);

  return (
    <div className="user-list border p-3 rounded" style={{ maxWidth: "250px" }}>
      <h5>Users online</h5>
      <ul className="list-unstyled mb-0">
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user} className="text-truncate">
              {user === username ? <b>{user} (You)</b> : user}
            </li>
          ))
        ) : (
          <li>No users online</li>
        )}
      </ul>
    </div>
  );
}
