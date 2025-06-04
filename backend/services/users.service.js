const db = require("../models/db");

// 🔐 Fonction utilitaire pour générer un code parent unique
function generateParentCode(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// 🔍 Récupérer tous les utilisateurs
const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT id, username, email, role, birthdate FROM users";
    db.query(sql, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// 🔍 Récupérer un utilisateur par ID
const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT id, username, email, role, birthdate FROM users WHERE id = ?";
    db.query(sql, [id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

// ➕ Créer un utilisateur
const createUser = (userData) => {
  return new Promise((resolve, reject) => {
    const { username, email, password, role, birthdate } = userData;
    const parent_code = generateParentCode();
    const sql = "INSERT INTO users (username, email, password, role, birthdate, parent_code) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [username, email, password, role, birthdate, parent_code], (err, result) => {
      if (err) return reject(err);
      resolve({ id: result.insertId, parent_code });
    });
  });
};

// ✏️ Modifier un utilisateur
const updateUser = (id, userData) => {
  return new Promise((resolve, reject) => {
    const { username, email, role, birthdate } = userData;
    const sql = "UPDATE users SET username = ?, email = ?, role = ?, birthdate = ? WHERE id = ?";
    db.query(sql, [username, email, role, birthdate, id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// 🗑️ Supprimer un utilisateur
const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM users WHERE id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Dans users.service.js
module.exports = {
  getAllUsersService: getAllUsers,
  getUserByIdService: getUserById,
  createUserService: createUser,
  updateUserService: updateUser,
  deleteUserService: deleteUser,
};

