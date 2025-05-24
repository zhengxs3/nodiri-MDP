const express = require("express");
const router = express.Router();

const {
  getModulePermissions,
  assignPermissionToModule
} = require("../controllers/modulePermission.controller");

router.get("/", getModulePermissions);
router.post("/", assignPermissionToModule);

module.exports = router;
