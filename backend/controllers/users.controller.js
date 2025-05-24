const db = require("../models/db");

// GET /api/users
const getAllUsers = (req, res) => {
  const sql = "SELECT id, username, email, role, firstname, lastname, birthdate FROM users";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des utilisateurs :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }
    res.json(results);
  });
};

// GET /api/users/:id
const getUserById = (req, res) => {
  const sql = "SELECT id, username, email, role, firstname, lastname, birthdate FROM users WHERE id = ?";
  db.query(sql, [req.params.id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Erreur serveur" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    res.json(results[0]);
  });
};

// POST /api/users
const createUser = (req, res) => {
  const { username, email, password, role, firstname, lastname, birthdate } = req.body;
  const sql = "INSERT INTO users (username, email, password, role, firstname, lastname, birthdate) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [username, email, password, role, firstname, lastname, birthdate], (err, result) => {
    if (err) {
      console.error("Erreur à la création :", err);
      return res.status(500).json({ error: "Erreur lors de la création de l'utilisateur" });
    }
    res.status(201).json({ message: "Utilisateur créé", userId: result.insertId });
  });
};

// PUT /api/users/:id
const updateUser = (req, res) => {
  const { username, email, role, firstname, lastname, birthdate } = req.body;
  const sql = "UPDATE users SET username = ?, email = ?, role = ?, firstname = ?, lastname = ?, birthdate = ? WHERE id = ?";
  db.query(sql, [username, email, role, firstname, lastname, birthdate, req.params.id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Erreur lors de la mise à jour" });
    }
    res.json({ message: "Utilisateur mis à jour" });
  });
};

// DELETE /api/users/:id
const deleteUser = (req, res) => {
  const sql = "DELETE FROM users WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Erreur lors de la suppression" });
    }
    res.json({ message: "Utilisateur supprimé" });
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
