const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth.controller");

// Routes d'authentification
router.post("/register", register);
router.post("/login", login);

module.exports = router;
