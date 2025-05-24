const db = require("../models/db");

// GET /api/user-emotions
const getAllUserEmotions = (req, res) => {
  const sql = `
    SELECT ue.id, ue.intensity, ue.user_id, ue.emotion_id, u.username, e.emotion_type
    FROM user_emotion ue
    JOIN users u ON ue.user_id = u.id
    JOIN emotions e ON ue.emotion_id = e.id
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    res.json(results);
  });
};

// GET /api/user-emotions/:id
const getUserEmotionById = (req, res) => {
  const sql = `
    SELECT ue.id, ue.intensity, ue.user_id, ue.emotion_id, u.username, e.emotion_type
    FROM user_emotion ue
    JOIN users u ON ue.user_id = u.id
    JOIN emotions e ON ue.emotion_id = e.id
    WHERE ue.id = ?
  `;
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    if (results.length === 0) return res.status(404).json({ error: "Entrée non trouvée" });
    res.json(results[0]);
  });
};

// POST /api/user-emotions
const createUserEmotion = (req, res) => {
  const { intensity, user_id, emotion_id } = req.body;
  const sql = "INSERT INTO user_emotion (intensity, user_id, emotion_id) VALUES (?, ?, ?)";
  db.query(sql, [intensity, user_id, emotion_id], (err, result) => {
    if (err) return res.status(500).json({ error: "Erreur à la création" });
    res.status(201).json({ message: "Émotion enregistrée", id: result.insertId });
  });
};

// DELETE /api/user-emotions/:id
const deleteUserEmotion = (req, res) => {
  const sql = "DELETE FROM user_emotion WHERE id = ?";
  db.query(sql, [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: "Erreur lors de la suppression" });
    res.json({ message: "Émotion supprimée" });
  });
};

module.exports = {
  getAllUserEmotions,
  getUserEmotionById,
  createUserEmotion,
  deleteUserEmotion
};
