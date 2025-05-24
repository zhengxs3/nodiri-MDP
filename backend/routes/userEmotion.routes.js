const express = require("express");
const router = express.Router();

const {
  getAllUserEmotions,
  getUserEmotionById,
  createUserEmotion,
  deleteUserEmotion
} = require("../controllers/userEmotion.controller");

router.get("/", getAllUserEmotions);
router.get("/:id", getUserEmotionById);
router.post("/", createUserEmotion);
router.delete("/:id", deleteUserEmotion);

module.exports = router;
