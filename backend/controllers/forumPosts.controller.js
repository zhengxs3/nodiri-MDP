const db = require("../models/db");

// GET /api/forum-posts
const getAllPosts = (req, res) => {
  db.query("SELECT * FROM forum_posts", (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    res.json(results);
  });
};

// POST /api/forum-posts
const createPost = (req, res) => {
  const { title, content, user_id, forum_category_id } = req.body;
  db.query("INSERT INTO forum_posts (title, content, user_id, forum_category_id) VALUES (?, ?, ?, ?)",
    [title, content, user_id, forum_category_id],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Erreur création post" });
      res.status(201).json({ message: "Post créé", id: result.insertId });
    }
  );
};

// DELETE /api/forum-posts/:id
const deletePost = (req, res) => {
  db.query("DELETE FROM forum_posts WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: "Erreur suppression post" });
    res.json({ message: "Post supprimé" });
  });
};

module.exports = { getAllPosts, createPost, deletePost };
