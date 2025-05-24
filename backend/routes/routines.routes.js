const express = require("express");
const router = express.Router();

const {
  getAllRoutines,
  getRoutineById,
  createRoutine,
  updateRoutine,
  deleteRoutine
} = require("../controllers/routines.controller");

router.get("/", getAllRoutines);
router.get("/:id", getRoutineById);
router.post("/", createRoutine);
router.put("/:id", updateRoutine);
router.delete("/:id", deleteRoutine);

module.exports = router;
