const db = require("../models/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// POST /api/auth/register
const register = (req, res) => {
  const { username, email, password, role, firstname, lastname, birthdate } = req.body;

  if (!username || !email || !password || !role) {
    return res.status(400).json({ error: "Champs obligatoires manquants" });
  }

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, users) => {
    if (err) {
      console.error("Erreur SQL SELECT :", err);
      return res.status(500).json({ error: "Erreur serveur (vérification email)" });
    }

    if (users.length > 0) {
      return res.status(400).json({ error: "Email déjà utilisé" });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const sql = `
        INSERT INTO users (username, email, password, role, firstname, lastname, birthdate)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      db.query(
        sql,
        [username, email, hashedPassword, role, firstname, lastname, birthdate],
        (err, result) => {
          if (err) {
            console.error("Erreur SQL INSERT :", err); // LOG ICI
            return res.status(500).json({ error: "Erreur à la création" });
          }
          res.status(201).json({ message: "Utilisateur créé", userId: result.insertId });
        }
      );
    } catch (hashErr) {
      console.error("Erreur de hash :", hashErr);
      return res.status(500).json({ error: "Erreur de traitement du mot de passe" });
    }
  });
};

// POST /api/auth/login
const login = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, users) => {
    if (err) {
      console.error("Erreur SQL SELECT (login) :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }

    if (users.length === 0) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    res.json({
      message: "Connexion réussie",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  });
};

module.exports = { register, login };
