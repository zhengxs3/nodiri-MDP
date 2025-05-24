const db = require("../models/db");

// GET /api/forum-categories
const getAllCategories = (req, res) => {
  db.query("SELECT * FROM forum_categories", (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    res.json(results);
  });
};

// POST /api/forum-categories
const createCategory = (req, res) => {
  const { title, description } = req.body;
  db.query("INSERT INTO forum_categories (title, description) VALUES (?, ?)",
    [title, description],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Erreur création catégorie" });
      res.status(201).json({ message: "Catégorie créée", id: result.insertId });
    }
  );
};

module.exports = { getAllCategories, createCategory };
