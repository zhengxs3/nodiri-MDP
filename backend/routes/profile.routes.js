// routes/profile.routes.js
const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");

router.get("/profile", authenticateToken, (req, res) => {
  res.json({
    message: "Profil sécurisé accessible",
    user: req.user, // Contient { id, role } depuis le JWT
  });
});

module.exports = router;
