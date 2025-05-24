const db = require("../models/db");

// GET /api/user-permissions
const getUserPermissions = (req, res) => {
  const sql = `
    SELECT up.id, up.user_id, u.username, up.permission_id
    FROM user_permission up
    JOIN users u ON up.user_id = u.id
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    res.json(results);
  });
};

// POST /api/user-permissions
const assignPermissionToUser = (req, res) => {
  const { user_id, permission_id } = req.body;
  const sql = "INSERT INTO user_permission (user_id, permission_id) VALUES (?, ?)";
  db.query(sql, [user_id, permission_id], (err, result) => {
    if (err) return res.status(500).json({ error: "Erreur lors de l'assignation" });
    res.status(201).json({ message: "Permission assignée", id: result.insertId });
  });
};

module.exports = { getUserPermissions, assignPermissionToUser };
