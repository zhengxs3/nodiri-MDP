const express = require("express");
const router = express.Router();

const {
  getAllModules,
  getModuleById,
  createModule,
  updateModule,
  deleteModule
} = require("../controllers/learningModules.controller");

router.get("/", getAllModules);
router.get("/:id", getModuleById);
router.post("/", createModule);
router.put("/:id", updateModule);
router.delete("/:id", deleteModule);

module.exports = router;
