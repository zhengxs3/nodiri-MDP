const express = require("express");
const router = express.Router();
const {
  getAllComments,
  createComment,
  deleteComment
} = require("../controllers/forumComments.controller");

router.get("/", getAllComments);
router.post("/", createComment);
router.delete("/:id", deleteComment);

module.exports = router;
