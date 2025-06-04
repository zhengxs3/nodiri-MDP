const express = require("express");
const router = express.Router();
const {
  getUserChallenges,
  assignChallengeToUser,
  markChallengeComplete
} = require("../controllers/userChallenges.controller");
const authenticateToken = require("../middlewares/authenticateToken");

router.get("/:userId", authenticateToken, getUserChallenges);
router.post("/", authenticateToken, assignChallengeToUser);
router.patch("/:id/complete", authenticateToken, markChallengeComplete);

module.exports = router;
