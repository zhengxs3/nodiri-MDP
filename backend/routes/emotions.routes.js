const express = require("express");
const router = express.Router();

const {
  getAllEmotions,
  getEmotionById,
  createEmotion,
  updateEmotion,
  deleteEmotion
} = require("../controllers/emotions.controller");

router.get("/", getAllEmotions);
router.get("/:id", getEmotionById);
router.post("/", createEmotion);
router.put("/:id", updateEmotion);
router.delete("/:id", deleteEmotion);

module.exports = router;
