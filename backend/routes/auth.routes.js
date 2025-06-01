const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const { login, register, deleteAccount } = require("../controllers/auth.controller");

router.post("/login", login);
router.post("/register", register);
router.post("/logout", (req, res) => {
  res.json({ message: "Déconnecté avec succès" });
});
router.delete("/me", authenticateToken, deleteAccount); // ✅ suppression




module.exports = router;
