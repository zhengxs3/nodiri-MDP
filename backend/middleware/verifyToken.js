const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token manquant ou invalide" });
  }

  const extractedToken = token.split(" ")[1];

  try {
    const decoded = jwt.verify(extractedToken, process.env.JWT_SECRET);
    req.user = decoded; // injecte les infos du token dans req.user
    next();
  } catch (err) {
    res.status(401).json({ error: "Token invalide ou expiré" });
  }
};

module.exports = verifyToken;
