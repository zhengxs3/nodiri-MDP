const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require("../controllers/users.controller");

// Routes REST

// Récupérer tous les utilisateurs
router.get("/", getAllUsers);

// Récupérer un utilisateur par ID
router.get("/:id", getUserById);

// Créer un nouvel utilisateur
router.post("/", createUser);

// Modifier un utilisateur
router.put("/:id", updateUser);

// Supprimer un utilisateur
router.delete("/:id", deleteUser);

module.exports = router;
