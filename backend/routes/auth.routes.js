const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");
const validateUser = require('../middlewares/validateUser');
const { login, register, deleteAccount } = require("../controllers/auth.controller");

router.post("/login", login);
router.post("/register", validateUser, register);
router.post("/logout", (req, res) => {
  res.json({ message: "Déconnecté avec succès" });
});
router.delete("/delete", authenticateToken, deleteAccount); // suppression


module.exports = router;
