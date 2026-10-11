const Dhikr = require("../models/dhikrModel");

// Get all dhikrs
const getDhikrs = async (req, res) => {
  try {
    const dhikrs = await Dhikr.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: dhikrs.length,
      data: dhikrs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch dhikrs",
      error: error.message,
    });
  }
};

// Get a single dhikr
const getDhikrById = async (req, res) => {
  try {
    const dhikr = await Dhikr.findById(req.params.id);

    if (!dhikr) {
      return res.status(404).json({
        success: false,
        message: "Dhikr not found",
      });
    }

    res.status(200).json({
      success: true,
      data: dhikr,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch dhikr   ",
      error: error.message,
    });
  }
};

// Get dhikrs by category
const getDhikrsByCategory = async (req, res) => {
  try {
    const dhikrs = await Dhikr.find({
      category: req.params.category,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: dhikrs.length,
      data: dhikrs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch dhikrs",
      error: error.message,
    });
  }
};

// Create a dhikr
const createDhikr = async (req, res) => {
  try {
    const { content, category, count } = req.body;

    const dhikr = await Dhikr.create({
      content,
      category,
      count,
    });

    res.status(201).json({
      success: true,
      message: "Dhikr created successfully",
      data: dhikr,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create dhikr",
      error: error.message,
    });
  }
};

// Update a dhikr
const updateDhikr = async (req, res) => {
  try {
    const { content, category, count } = req.body;

    const dhikr = await Dhikr.findByIdAndUpdate(
      req.params.id,
      {
        content,
        category,
        count,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!dhikr) {
      return res.status(404).json({
        success: false,
        message: "Dhikr not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Dhikr updated successfully",
      data: dhikr,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update dhikr",
      error: error.message,
    });
  }
};

// Delete a dhikr
const deleteDhikr = async (req, res) => {
  try {
    const dhikr = await Dhikr.findByIdAndDelete(req.params.id);

    if (!dhikr) {
      return res.status(404).json({
        success: false,
        message: "Dhikr not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Dhikr deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete dhikr",
      error: error.message,
    });
  }
};

module.exports = {
  getDhikrs,
  getDhikrById,
  getDhikrsByCategory,
  createDhikr,
  updateDhikr,
  deleteDhikr,
};
