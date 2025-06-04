const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");
const checkRole = require("../middlewares/checkRole");
const usersController = require("../controllers/users.controller");

// Les 5 routes CRUD user accessibles seulement par admin :
router.get(
  "/users",
  authenticateToken,
  checkRole(["admin"]),
  usersController.getAllUsers
);

router.get(
  "/users/:id",
  authenticateToken,
  checkRole(["admin"]),
  usersController.getUserById
);

router.post(
  "/users",
  authenticateToken,
  checkRole(["admin"]),
  usersController.createUser
);

router.put(
  "/users/:id",
  authenticateToken,
  checkRole(["admin"]),
  usersController.updateUser
);

router.delete(
  "/users/:id",
  authenticateToken,
  checkRole(["admin"]),
  usersController.deleteUser
);

module.exports = router;
