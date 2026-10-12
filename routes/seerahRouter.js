const express = require("express");
const router = express.Router();

const {
  createSeerah,
  getAllSeerah,
  getSeerahById,
  updateSeerah,
  deleteSeerah,
} = require("../controllers/seerahController");
const auth = require("../middleware/authMiddleware");

const upload = require("../middleware/upload");

// Create a Seerah article
router.post("/", upload.single("image"), auth, createSeerah);

// Get all articles, optionally filtered by category
router.get("/", getAllSeerah);

// Get one article
router.get("/:id", getSeerahById);

// Update an article, optionally replacing its image
router.patch("/:id", upload.single("image"), auth, updateSeerah);

// Delete an article
router.delete("/:id", auth, deleteSeerah);

module.exports = router;