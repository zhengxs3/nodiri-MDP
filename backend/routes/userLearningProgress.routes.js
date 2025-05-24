const express = require("express");
const router = express.Router();

const {
  getAllProgress,
  getProgressById,
  createProgress,
  updateProgress,
  deleteProgress
} = require("../controllers/userLearningProgress.controller");

router.get("/", getAllProgress);
router.get("/:id", getProgressById);
router.post("/", createProgress);
router.put("/:id", updateProgress);
router.delete("/:id", deleteProgress);

module.exports = router;
