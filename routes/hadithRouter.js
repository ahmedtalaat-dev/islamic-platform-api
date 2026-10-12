const express = require("express");
const auth = require("../middleware/authMiddleware");

const {
  getHadiths,
  getHadithById,
  getHadithsByCategory,
  createHadith,
  updateHadith,
  deleteHadith,
} = require("../controllers/hadithController");

const router = express.Router();

router.get("/", getHadiths);

router.get("/category/:category", getHadithsByCategory);

router.get("/:id", getHadithById);

router.post("/", auth, createHadith);

router.put("/:id", auth, updateHadith);

router.delete("/:id", auth, deleteHadith);

module.exports = router;
