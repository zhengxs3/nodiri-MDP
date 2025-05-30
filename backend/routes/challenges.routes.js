const express = require("express");
const router = express.Router();
const { getAllChallenges, createChallenge } = require("../controllers/challenges.controller");
const authenticateToken = require("../middleware/authenticateToken");
const checkRole = require("../middleware/checkRole");

router.get("/", authenticateToken, getAllChallenges);
router.post("/", authenticateToken, checkRole(["admin", "parent"]), createChallenge);

module.exports = router;
