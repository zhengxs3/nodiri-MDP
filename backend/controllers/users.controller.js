const db = require("../models/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

// 🔐 Fonction utilitaire pour générer un code parent unique
function generateParentCode(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// GET /api/users
const getAllUsers = (req, res) => {
  const sql = "SELECT id, username, email, role, birthdate FROM users";
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
  const sql = "SELECT id, username, email, role, birthdate FROM users WHERE id = ?";
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
const createUser = async (req, res) => {
  try {
    const { username, email, password, role, birthdate, parent_code } = req.body;

    // ✅ Vérification du mot de passe sécurisé
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{10,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error: "Le mot de passe doit contenir au moins 10 caractères, une majuscule, un chiffre et un caractère spécial."
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Vérification des doublons email ou username
    const checkSql = "SELECT * FROM users WHERE email = ? OR username = ?";
    db.query(checkSql, [email, username], (checkErr, checkResult) => {
      if (checkErr) {
        console.error("Erreur lors de la vérification des doublons :", checkErr);
        return res.status(500).json({ error: "Erreur serveur (vérification doublons)" });
      }

      if (checkResult.length > 0) {
        const existing = checkResult[0];
        const errorMsg = existing.email === email
          ? "Cet email est déjà utilisé."
          : "Ce nom d'utilisateur est déjà utilisé.";
        return res.status(409).json({ error: errorMsg });
      }

      // ✅ Génération du parent_code si nécessaire
      let finalParentCode = parent_code;
      if (role === 'parent') {
        finalParentCode = generateParentCode();
      }

      // ✅ Insertion
      const sql = "INSERT INTO users (username, email, password, role, birthdate, parent_code) VALUES (?, ?, ?, ?, ?, ?)";
      const values = [username, email, hashedPassword, role, birthdate, finalParentCode];

      db.query(sql, values, (err, result) => {
        if (err) {
          console.error("Erreur à la création :", err);
          return res.status(500).json({ error: "Erreur lors de la création de l'utilisateur" });
        }

        const token = jwt.sign({ id: result.insertId, role }, process.env.JWT_SECRET, { expiresIn: "6h" });

        res.status(201).json({
          message: "Utilisateur créé",
          userId: result.insertId,
          token,
          parent_code: role === "parent" ? finalParentCode : undefined
        });
      });
    });

  } catch (err) {
    console.error("Erreur création utilisateur :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// PUT /api/users/:id
const updateUser = (req, res) => {
  const { username, email, role, birthdate } = req.body;
  const sql = "UPDATE users SET username = ?, email = ?, role = ?, birthdate = ? WHERE id = ?";
  db.query(sql, [username, email, role, birthdate, req.params.id], (err, result) => {
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
