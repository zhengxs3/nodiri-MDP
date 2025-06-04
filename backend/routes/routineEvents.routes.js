const express = require("express");
const router = express.Router();
const {
  getRoutineEventsByUserAndDate,
  addRoutineEvent,
  deleteRoutineEvent
} = require("../controllers/routineEvents.controller");
const authenticateToken = require("../middlewares/authenticateToken");

// Récupérer tous les pictos d'un utilisateur pour une date donnée
router.get("/:userId", authenticateToken, getRoutineEventsByUserAndDate);

// Ajouter un pictogramme à une routine
router.post("/", authenticateToken, addRoutineEvent);

// Supprimer un pictogramme d'une routine
router.delete("/:id", authenticateToken, deleteRoutineEvent);

module.exports = router;
