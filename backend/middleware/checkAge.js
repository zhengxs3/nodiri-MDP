// middleware/checkAge.js
const db = require("../models/db");

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

const checkAge = (minAge) => {
  return async (req, res, next) => {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Utilisateur non authentifié" });

    const sql = "SELECT birthdate FROM users WHERE id = ?";
    db.query(sql, [userId], (err, results) => {
      if (err) return res.status(500).json({ error: "Erreur serveur" });
      if (results.length === 0) return res.status(404).json({ error: "Utilisateur introuvable" });

      const age = getAgeFromBirthdate(results[0].birthdate);
      if (age < minAge) {
        return res.status(403).json({ error: `Accès interdit aux utilisateurs de moins de ${minAge} ans` });
      }
      next();
    });
  };
};

module.exports = checkAge;
