const pool = require("../db");
const express = require("express");
const router = express.Router();

// Получить все презентации
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM presentations ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching presentations:", err);
    res.status(500).json({ message: "Ошибка при получении презентаций" });
  }
});

// Получить одну презентацию по ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM presentations WHERE id = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Презентация не найдена" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching presentation:", err);
    res.status(500).json({ message: "Ошибка при получении презентации" });
  }
});

// Создать новую презентацию
router.post("/", async (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: "Не указаны title и author" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO presentations (title, author, created_at, updated_at)
       VALUES ($1, $2, NOW(), NOW())
       RETURNING *`,
      [title, author]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating presentation:", err);
    res.status(500).json({ message: "Ошибка при создании презентации" });
  }
});

module.exports = router;
