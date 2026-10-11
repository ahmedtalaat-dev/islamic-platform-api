const express = require("express");
const auth = require("../middleware/authMiddleware");

const {
  getDhikrs,
  getDhikrById,
  getDhikrsByCategory,
  createDhikr,
  updateDhikr,
  deleteDhikr,
} = require("../controllers/dhikrController");

const router = express.Router();

router.get("/", getDhikrs);

router.get("/category/:category", getDhikrsByCategory);

router.get("/:id", getDhikrById);

router.post("/", auth, createDhikr);

router.put("/:id", auth, updateDhikr);

router.delete("/:id", auth, deleteDhikr);

module.exports = router;
