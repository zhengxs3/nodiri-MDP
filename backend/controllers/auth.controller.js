const db = require("../models/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const login = (req, res) => {
  const { email, password, parent_code } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: "Erreur serveur" });
    if (results.length === 0) return res.status(401).json({ error: "Email ou mot de passe incorrect" });

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ error: "Email ou mot de passe incorrect" });

    // Vérification du code parental pour les < 15 ans
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

module.exports = { login };
