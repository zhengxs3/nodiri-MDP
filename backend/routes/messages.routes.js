const express = require("express"); 
const router = express.Router();
const { getAllMessages, getMessageById, createMessage, deleteMessage } = require("../controllers/messages.controller");
const authenticateToken = require("../middlewares/authenticateToken");
const checkAge = require("../middlewares/checkAge");

router.get("/", authenticateToken, checkAge(15), getAllMessages);
router.get("/:id", authenticateToken, checkAge(15), getMessageById);
router.post("/", authenticateToken, checkAge(15), createMessage);
router.delete("/:id", authenticateToken, checkAge(15), deleteMessage);

module.exports = router;
