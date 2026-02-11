const express = require("express");
const { signup, login ,googleAuth} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/signup", signup);
router.post("/google", googleAuth);
router.post("/login", login);
  

module.exports = router;
