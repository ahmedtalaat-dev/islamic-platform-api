const express = require("express");
const auth = require("../middleware/authMiddleware");

const {
  getFatwas,
  getFatwaById,
  getFatwasByCategory,
  createFatwa,
  updateFatwa,
  deleteFatwa,
} = require("../controllers/fatwaController");

const router = express.Router();

router.get("/", getFatwas);

router.get("/category/:category", getFatwasByCategory);

router.get("/:id", getFatwaById);

router.post("/", auth, createFatwa);

router.put("/:id", auth, updateFatwa);

router.delete("/:id", auth, deleteFatwa);

module.exports = router;
