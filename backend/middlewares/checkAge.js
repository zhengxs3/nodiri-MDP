const db = require('../models/db'); // attention au bon chemin !

function calculateAge(birthdate) {
  const birth = new Date(birthdate);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

module.exports = (minAge) => {
  return (req, res, next) => {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Non authentifié' });

    db.query('SELECT birthdate FROM users WHERE id = ?', [userId], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ error: 'Utilisateur non trouvé' });

      const age = calculateAge(results[0].birthdate);
      if (age < minAge) {
        return res.status(403).json({ error: `Fonctionnalité réservée aux utilisateurs de ${minAge} ans ou plus.` });
      }

      next();
    });
  };
};
