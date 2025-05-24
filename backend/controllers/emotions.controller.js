const db = require("../models/db");

// GET /api/emotions
const getAllEmotions = (req, res) => {
  const sql = "SELECT * FROM emotions";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    res.json(results);
  });
};

// GET /api/emotions/:id
const getEmotionById = (req, res) => {
  const sql = "SELECT * FROM emotions WHERE id = ?";
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    if (results.length === 0) return res.status(404).json({ error: "Émotion non trouvée" });
    res.json(results[0]);
  });
};

// POST /api/emotions
const createEmotion = (req, res) => {
  const { emotion_type } = req.body;
  const sql = "INSERT INTO emotions (emotion_type) VALUES (?)";
  db.query(sql, [emotion_type], (err, result) => {
    if (err) return res.status(500).json({ error: "Erreur lors de la création de l'émotion" });
    res.status(201).json({ message: "Émotion créée", emotionId: result.insertId });
  });
};

// PUT /api/emotions/:id
const updateEmotion = (req, res) => {
  const { emotion_type } = req.body;
  const sql = "UPDATE emotions SET emotion_type = ? WHERE id = ?";
  db.query(sql, [emotion_type, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: "Erreur lors de la mise à jour" });
    res.json({ message: "Émotion mise à jour" });
  });
};

// DELETE /api/emotions/:id
const deleteEmotion = (req, res) => {
  const sql = "DELETE FROM emotions WHERE id = ?";
  db.query(sql, [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: "Erreur lors de la suppression" });
    res.json({ message: "Émotion supprimée" });
  });
};

module.exports = {
  getAllEmotions,
  getEmotionById,
  createEmotion,
  updateEmotion,
  deleteEmotion
};
