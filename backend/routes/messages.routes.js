const express = require("express");
const router = express.Router();

const {
  getAllMessages,
  getMessageById,
  createMessage,
  deleteMessage
} = require("../controllers/messages.controller");

// Routes
router.get("/", getAllMessages);
router.get("/:id", getMessageById);
router.post("/", createMessage);
router.delete("/:id", deleteMessage);

module.exports = router;
