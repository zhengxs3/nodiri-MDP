const checkRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(403).json({ error: "Utilisateur non authentifié" });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Accès interdit (rôle insuffisant)" });
    }
    next();
  };
};

module.exports = checkRole;
