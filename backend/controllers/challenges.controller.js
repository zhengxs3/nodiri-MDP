const db = require("../models/db");

// GET /api/challenges
const getAllChallenges = (req, res) => {
  const sql = "SELECT * FROM challenges WHERE is_active = 1";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    res.json(results);
  });
};

// POST /api/challenges
const createChallenge = (req, res) => {
  const { title, description, image_url, created_by, target_role } = req.body;
  const sql = `
    INSERT INTO challenges (title, description, image_url, created_by, target_role)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(sql, [title, description, image_url, created_by, target_role || 'child'], (err, result) => {
    if (err) return res.status(500).json({ error: "Erreur lors de la création du défi" });
    res.status(201).json({ message: "Défi créé", id: result.insertId });
  });
};

module.exports = {
  getAllChallenges,
  createChallenge
};
