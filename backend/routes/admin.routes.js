// routes/admin.routes.js
const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const checkRole = require("../middleware/checkRole");

// Seuls les utilisateurs avec le rôle "admin" peuvent accéder à cette route
router.get("/admin-only", authenticateToken, checkRole(["admin"]), (req, res) => {
  res.json({ message: "Bienvenue, administrateur !" });
});

module.exports = router;
