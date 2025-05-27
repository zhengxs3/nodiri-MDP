const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token manquant' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contient l'id de l'utilisateur, etc.
    next();
  } catch (err) {
    res.status(403).json({ message: 'Token invalide' });
  }
};

module.exports = auth;
