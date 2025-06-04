const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");
const authenticateToken = require("../middlewares/authenticateToken");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");
const validateUser = require("../middlewares/validateUser");


// Toutes les routes sont protégées par défaut (à adapter selon ton besoin)
router.use(authenticateToken);

router.post("/", validateUser, userController.createUser);

// Les autres routes
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
