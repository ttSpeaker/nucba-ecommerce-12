const express = require("express");

const authController = require("../controllers/auth");
const router = express.Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/logout", authController.logoutUser);
router.post("/refresh", authController.refreshToken);

module.exports = router;
