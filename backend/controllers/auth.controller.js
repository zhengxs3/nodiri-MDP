const db = require("../models/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

// Fonction utilitaire pour calculer l’âge
function getAgeFromBirthdate(birthdate) {
  const birth = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

const register = async (req, res) => {
  const { username, email, password, role, birthdate, parent_code } = req.body;
  const age = getAgeFromBirthdate(birthdate);

  const createUser = async () => {
    const emailCheck = "SELECT * FROM users WHERE email = ?";
    db.query(emailCheck, [email], async (err, results) => {
      if (err) return res.status(500).json({ error: "Erreur serveur" });
      if (results.length > 0) return res.status(400).json({ error: "Email déjà utilisé" });

      const hashedPassword = await bcrypt.hash(password, 10);
      const sql = "INSERT INTO users (username, email, password, role, birthdate, parent_code) VALUES (?, ?, ?, ?, ?, ?)";
      db.query(sql, [username, email, hashedPassword, role, birthdate, parent_code || null], (err, result) => {
        if (err) return res.status(500).json({ error: "Erreur lors de la création de l'utilisateur" });

        const token = jwt.sign(
          { id: result.insertId, role },
          process.env.JWT_SECRET,
          { expiresIn: "6h" }
        );

        res.status(201).json({
          message: "Utilisateur créé",
          userId: result.insertId,
          token
        });
      });
    });
  };

  if (age < 15) {
    if (!parent_code) {
      return res.status(403).json({ error: "Les utilisateurs de moins de 15 ans doivent être créés avec un code parent." });
    }

    const parentCheck = "SELECT * FROM users WHERE parent_code = ? AND role = 'parent'";
    db.query(parentCheck, [parent_code], (err, parentResults) => {
      if (err) return res.status(500).json({ error: "Erreur lors de la vérification du code parent" });
      if (parentResults.length === 0) {
        return res.status(400).json({ error: "Code parent invalide ou inexistant" });
      }
      createUser();
    });
  } else {
    createUser();
  }
};

const login = (req, res) => {
  const { email, password, parent_code } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    if (results.length === 0) return res.status(401).json({ error: "Email ou mot de passe incorrect" });

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ error: "Email ou mot de passe incorrect" });

    const age = getAgeFromBirthdate(user.birthdate);
    if (age < 15) {
      if (!user.parent_code || user.parent_code !== parent_code) {
        return res.status(403).json({ error: "Code parental requis ou incorrect" });
      }
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "6h" }
    );

    res.json({
      message: "Connexion réussie",
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      }
    });
  });
};

// ✅ Suppression du compte de l'utilisateur connecté
const deleteAccount = (req, res) => {
  const userId = req.user.id;

  const sql = "DELETE FROM users WHERE id = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) return res.status(500).json({ error: "Erreur serveur lors de la suppression" });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Utilisateur introuvable" });
    }

    res.json({ message: "Compte supprimé avec succès" });
  });
};

module.exports = { login, register, deleteAccount };
