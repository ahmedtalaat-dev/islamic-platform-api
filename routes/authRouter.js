const express = require("express");

const { login, getMe, logout } = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", login);

router.get("/me", protect, getMe);

router.post("/logout", logout);

module.exports = router;
