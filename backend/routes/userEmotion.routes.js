const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");


const {
  getAllUserEmotions,
  getUserEmotionById,
  createUserEmotion,
  deleteUserEmotion
} = require("../controllers/userEmotion.controller");

router.get("/", getAllUserEmotions);
router.get("/:id", getUserEmotionById);
router.post("/", authenticateToken, createUserEmotion);
router.delete("/:id", authenticateToken, deleteUserEmotion);

module.exports = router;
