const db = require("../models/db");

// GET /api/messages
const getAllMessages = (req, res) => {
  const sql = "SELECT * FROM messages";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    res.json(results);
  });
};

// GET /api/messages/:id
const getMessageById = (req, res) => {
  const sql = "SELECT * FROM messages WHERE id = ?";
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    if (results.length === 0) return res.status(404).json({ error: "Message non trouvé" });
    res.json(results[0]);
  });
};

// POST /api/messages
const createMessage = (req, res) => {
  const { content, sender, receiver } = req.body;
  const sql = "INSERT INTO messages (content, sender, receiver) VALUES (?, ?, ?)";
  db.query(sql, [content, sender, receiver], (err, result) => {
    if (err) return res.status(500).json({ error: "Erreur lors de l'envoi du message" });
    res.status(201).json({ message: "Message envoyé", messageId: result.insertId });
  });
};

// DELETE /api/messages/:id
const deleteMessage = (req, res) => {
  const sql = "DELETE FROM messages WHERE id = ?";
  db.query(sql, [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: "Erreur lors de la suppression" });
    res.json({ message: "Message supprimé" });
  });
};

module.exports = {
  getAllMessages,
  getMessageById,
  createMessage,
  deleteMessage
};
