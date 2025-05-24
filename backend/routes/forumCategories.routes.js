const express = require("express");
const router = express.Router();
const {
  getAllCategories,
  createCategory
} = require("../controllers/forumCategories.controller");

router.get("/", getAllCategories);
router.post("/", createCategory);

module.exports = router;
