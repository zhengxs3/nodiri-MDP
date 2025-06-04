const express = require("express");
const router = express.Router();
const { getAllPictograms, createPictogram } = require("../controllers/pictograms.controller");
const authenticateToken = require("../middlewares/authenticateToken");
const checkRole = require("../middlewares/checkRole");

// Accessible à tous (lecture)
router.get("/", getAllPictograms);

// Ajout réservé aux admins
router.post("/", authenticateToken, checkRole(["admin"]), createPictogram);

module.exports = router;
