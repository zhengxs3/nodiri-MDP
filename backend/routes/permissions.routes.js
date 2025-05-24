const express = require("express");
const router = express.Router();

const {
  getAllPermissions,
  createPermission
} = require("../controllers/permissions.controller");

router.get("/", getAllPermissions);
router.post("/", createPermission);

module.exports = router;
