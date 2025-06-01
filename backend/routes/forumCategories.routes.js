const express = require("express");
const router = express.Router();
const {
  getAllCategories,
  createCategory
} = require("../controllers/forumCategories.controller");
const authenticateToken = require("../middleware/authenticateToken");
const checkAge = require("../middleware/checkAge");

router.get("/", authenticateToken, checkAge(15), getAllCategories);
router.post("/", authenticateToken, checkAge(15), createCategory);

module.exports = router;
