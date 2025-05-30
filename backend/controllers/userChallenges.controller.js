const db = require("../models/db");

// GET /api/user-challenges/:userId
const getUserChallenges = (req, res) => {
  const userId = req.params.userId;
  const sql = `
    SELECT uc.id, c.title, c.image_url, c.description, uc.is_completed, uc.completed_at
    FROM user_challenges uc
    JOIN challenges c ON uc.challenge_id = c.id
    WHERE uc.user_id = ?
  `;
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    res.json(results);
  });
};

// POST /api/user-challenges
const assignChallengeToUser = (req, res) => {
  const { user_id, challenge_id } = req.body;
  const sql = `
    INSERT INTO user_challenges (user_id, challenge_id)
    VALUES (?, ?)
  `;
  db.query(sql, [user_id, challenge_id], (err, result) => {
    if (err) return res.status(500).json({ error: "Erreur lors de l'affectation" });
    res.status(201).json({ message: "Défi attribué", id: result.insertId });
  });
};

// PATCH /api/user-challenges/:id/complete
const markChallengeComplete = (req, res) => {
  const id = req.params.id;
  const sql = `
    UPDATE user_challenges
    SET is_completed = 1, completed_at = NOW()
    WHERE id = ?
  `;
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: "Erreur de validation du défi" });
    res.json({ message: "Défi marqué comme terminé" });
  });
};

module.exports = {
  getUserChallenges,
  assignChallengeToUser,
  markChallengeComplete
};
