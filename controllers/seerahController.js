const Seerah = require("../models/seerahModel");
const fs = require("fs");
const path = require("path");

const deleteImage = (filename) => {
  if (!filename) return;

  const imagePath = path.join(
    __dirname,
    "../uploads",
    path.basename(filename)
  );

  fs.unlink(imagePath, (err) => {
    if (err && err.code !== "ENOENT") {
      console.error("Failed to delete image:", err.message);
    }
  });
};

// CREATE
exports.createSeerah = async (req, res) => {
  try {
    const { title, description, content, category, readingTime } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "Seerah image is required",
      });
    }

    const seerah = await Seerah.create({
      title,
      description,
      content,
      category,
      readingTime,
      image: req.file.filename,
    });

    res.status(201).json({
      message: "Seerah created successfully",
      data: seerah,
    });
  } catch (error) {
    if (req.file) deleteImage(req.file.filename);

    res.status(400).json({
      message: error.message,
    });
  }
};

// GET ALL
exports.getAllSeerah = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = {};

    if (category) filter.category = category;

    const seerah = await Seerah.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      results: seerah.length,
      data: seerah,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ONE
exports.getSeerahById = async (req, res) => {
  try {
    const seerah = await Seerah.findById(req.params.id);

    if (!seerah) {
      return res.status(404).json({
        message: "Seerah article not found",
      });
    }

    res.status(200).json({ data: seerah });
  } catch (error) {
    res.status(400).json({ message: "Invalid Seerah ID" });
  }
};

// UPDATE
exports.updateSeerah = async (req, res) => {
  try {
    const updates = { ...req.body };

    // Never accept a client-provided image path.
    delete updates.image;

    if (updates.readingTime !== undefined) {
      updates.readingTime = Number(updates.readingTime);
    }

    const oldSeerah = await Seerah.findById(req.params.id);

    if (!oldSeerah) {
      if (req.file) deleteImage(req.file.filename);

      return res.status(404).json({
        message: "Seerah article not found",
      });
    }

    const updatedSeerah = await Seerah.findByIdAndUpdate(
      req.params.id,
      {
        ...updates,
        ...(req.file && { image: req.file.filename }),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (req.file && oldSeerah.image) {
      deleteImage(oldSeerah.image);
    }

    res.status(200).json({
      message: "Seerah updated successfully",
      data: updatedSeerah,
    });
  } catch (error) {
    if (req.file) deleteImage(req.file.filename);

    res.status(400).json({ message: error.message });
  }
};

// DELETE
exports.deleteSeerah = async (req, res) => {
  try {
    const seerah = await Seerah.findByIdAndDelete(req.params.id);

    if (!seerah) {
      return res.status(404).json({
        message: "Seerah article not found",
      });
    }

    if (seerah.image) deleteImage(seerah.image);

    res.status(200).json({
      message: "Seerah deleted successfully",
    });
  } catch (error) {
    res.status(400).json({ message: "Invalid Seerah ID" });
  }
};