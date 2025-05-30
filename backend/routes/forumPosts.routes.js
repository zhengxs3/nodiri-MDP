const express = require("express");
const router = express.Router();
const {
  getAllPosts,
  createPost,
  deletePost
} = require("../controllers/forumPosts.controller");
const authenticateToken = require("../middleware/authenticateToken");
const checkAge = require("../middleware/checkAge");

// Toutes les routes protégées : forum réservé aux 15+
router.get("/", authenticateToken, checkAge(15), getAllPosts);
router.post("/", authenticateToken, checkAge(15), createPost);
router.delete("/:id", authenticateToken, checkAge(15), deletePost);

module.exports = router;
