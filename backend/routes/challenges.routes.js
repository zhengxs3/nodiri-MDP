const express = require("express");
const router = express.Router();
const { getAllChallenges, createChallenge } = require("../controllers/challenges.controller");
const authenticateToken = require("../middlewares/authenticateToken");
const checkRole = require("../middlewares/checkRole");

router.get("/", authenticateToken, getAllChallenges);
router.post("/", authenticateToken, checkRole(["admin", "parent"]), createChallenge);

module.exports = router;
