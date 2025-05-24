const db = require("../models/db");

// GET /api/forum-comments
const getAllComments = (req, res) => {
  db.query("SELECT * FROM forum_comments", (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    res.json(results);
  });
};

// POST /api/forum-comments
const createComment = (req, res) => {
  const { content, user_id, forum_posts_id } = req.body;
  db.query("INSERT INTO forum_comments (content, user_id, forum_posts_id) VALUES (?, ?, ?)",
    [content, user_id, forum_posts_id],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Erreur création commentaire" });
      res.status(201).json({ message: "Commentaire ajouté", id: result.insertId });
    }
  );
};

// DELETE /api/forum-comments/:id
const deleteComment = (req, res) => {
  db.query("DELETE FROM forum_comments WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: "Erreur suppression commentaire" });
    res.json({ message: "Commentaire supprimé" });
  });
};

module.exports = { getAllComments, createComment, deleteComment };
