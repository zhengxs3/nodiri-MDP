const express = require("express");
const router = express.Router();
const { getAllComments, createComment, deleteComment } = require("../controllers/forumComments.controller");
const authenticateToken = require("../middleware/authenticateToken");
const checkAge = require("../middleware/checkAge");

router.get("/", authenticateToken, checkAge(15), getAllComments);
router.post("/", authenticateToken, checkAge(15), createComment);
router.delete("/:id", authenticateToken, checkAge(15), deleteComment);

module.exports = router;
