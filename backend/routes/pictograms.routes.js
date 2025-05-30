const express = require("express");
const router = express.Router();
const { getAllPictograms, createPictogram } = require("../controllers/pictograms.controller");
const authenticateToken = require("../middleware/authenticateToken");
const checkRole = require("../middleware/checkRole");

// Accessible à tous (lecture)
router.get("/", getAllPictograms);

// Ajout réservé aux admins
router.post("/", authenticateToken, checkRole(["admin"]), createPictogram);

module.exports = router;
