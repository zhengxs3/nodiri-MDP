const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

router.get("/", verifyToken, (req, res) => {
  res.json({
    message: "Utilisateur authentifié",
    user: req.user
  });
});

module.exports = router;
