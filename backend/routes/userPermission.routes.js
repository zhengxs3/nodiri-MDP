const express = require("express");
const router = express.Router();

const {
  getUserPermissions,
  assignPermissionToUser
} = require("../controllers/userPermission.controller");

router.get("/", getUserPermissions);
router.post("/", assignPermissionToUser);

module.exports = router;
