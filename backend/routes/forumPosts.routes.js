const express = require("express");
const router = express.Router();
const {
  getAllPosts,
  createPost,
  deletePost
} = require("../controllers/forumPosts.controller");

router.get("/", getAllPosts);
router.post("/", createPost);
router.delete("/:id", deletePost);

module.exports = router;
