
const Seerah = require("../models/seerahModel");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const path = require("path");

const deleteImage = async (seerah) => {
  if (!seerah?.image) return;

  // New Cloudinary images
  if (seerah.imagePublicId) {
    await cloudinary.uploader.destroy(seerah.imagePublicId);
    return;
  }

  // Legacy images previously stored in the local uploads folder
  if (!seerah.image.startsWith("http")) {
    const imagePath = path.join(
      __dirname,
      "../uploads",
      path.basename(seerah.image)
    );

    try {
      await fs.promises.unlink(imagePath);
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }
};

const cleanupUploadedImage = async (file) => {
  if (!file?.filename) return;

  try {
    await cloudinary.uploader.destroy(file.filename);
  } catch (error) {
    console.error("Failed to clean up uploaded image:", error.message);
  }
};

// CREATE
exports.createSeerah = async (req, res) => {
  try {
    const {
      title,
      description,
      content,
      category,
      readingTime,
    } = req.body;

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
      image: req.file.path,
      imagePublicId: req.file.filename,
    });

    return res.status(201).json({
      message: "Seerah created successfully",
      data: seerah,
    });
  } catch (error) {
    await cleanupUploadedImage(req.file);

    return res.status(400).json({
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

    const seerah = await Seerah.find(filter).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      results: seerah.length,
      data: seerah,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
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

    return res.status(200).json({ data: seerah });
  } catch (error) {
    return res.status(400).json({
      message: "Invalid Seerah ID",
    });
  }
};

// UPDATE
exports.updateSeerah = async (req, res) => {
  try {
    const updates = { ...req.body };

    // Never accept image URLs or public IDs from the client.
    delete updates.image;
    delete updates.imagePublicId;

    if (updates.readingTime !== undefined) {
      updates.readingTime = Number(updates.readingTime);
    }

    const oldSeerah = await Seerah.findById(req.params.id);

    if (!oldSeerah) {
      await cleanupUploadedImage(req.file);

      return res.status(404).json({
        message: "Seerah article not found",
      });
    }

    const updateData = {
      ...updates,
    };

    if (req.file) {
      updateData.image = req.file.path;
      updateData.imagePublicId = req.file.filename;
    }

    const updatedSeerah = await Seerah.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    // Delete the old image only after the database update succeeds.
    if (req.file && oldSeerah.image) {
      try {
        await deleteImage(oldSeerah);
      } catch (error) {
        console.error(
          "Failed to delete old image:",
          error.message
        );
      }
    }

    return res.status(200).json({
      message: "Seerah updated successfully",
      data: updatedSeerah,
    });
  } catch (error) {
    await cleanupUploadedImage(req.file);

    return res.status(400).json({
      message: error.message,
    });
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

    try {
      await deleteImage(seerah);
    } catch (error) {
      console.error(
        "Failed to delete stored image:",
        error.message
      );
    }

    return res.status(200).json({
      message: "Seerah deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Invalid Seerah ID",
    });
  }
};
