const db = require("../models/db");

// GET /api/user-progress
const getAllProgress = (req, res) => {
  const sql = `
    SELECT p.id, p.user_id, u.username, p.learning_module_id, m.title AS module_title, p.progress
    FROM user_learning_progress p
    JOIN users u ON p.user_id = u.id
    JOIN learning_modules m ON p.learning_module_id = m.id
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    res.json(results);
  });
};

// GET /api/user-progress/:id
const getProgressById = (req, res) => {
  const sql = `
    SELECT p.id, p.user_id, u.username, p.learning_module_id, m.title AS module_title, p.progress
    FROM user_learning_progress p
    JOIN users u ON p.user_id = u.id
    JOIN learning_modules m ON p.learning_module_id = m.id
    WHERE p.id = ?
  `;
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    if (results.length === 0) return res.status(404).json({ error: "Progression non trouvée" });
    res.json(results[0]);
  });
};

// POST /api/user-progress
const createProgress = (req, res) => {
  const { user_id, learning_module_id, progress } = req.body;
  const sql = "INSERT INTO user_learning_progress (user_id, learning_module_id, progress) VALUES (?, ?, ?)";
  db.query(sql, [user_id, learning_module_id, progress], (err, result) => {
    if (err) return res.status(500).json({ error: "Erreur lors de la création" });
    res.status(201).json({ message: "Progression enregistrée", id: result.insertId });
  });
};

// PUT /api/user-progress/:id
const updateProgress = (req, res) => {
  const { progress } = req.body;
  const sql = "UPDATE user_learning_progress SET progress = ? WHERE id = ?";
  db.query(sql, [progress, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: "Erreur lors de la mise à jour" });
    res.json({ message: "Progression mise à jour" });
  });
};

// DELETE /api/user-progress/:id
const deleteProgress = (req, res) => {
  const sql = "DELETE FROM user_learning_progress WHERE id = ?";
  db.query(sql, [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: "Erreur lors de la suppression" });
    res.json({ message: "Progression supprimée" });
  });
};

module.exports = {
  getAllProgress,
  getProgressById,
  createProgress,
  updateProgress,
  deleteProgress
};
