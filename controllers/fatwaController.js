const Fatwa = require("../models/fatwaModel");

// Get all fatwas
const getFatwas = async (req, res) => {
  try {
    const fatwas = await Fatwa.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: fatwas.length,
      data: fatwas,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch fatwas",
      error: error.message,
    });
  }
};

// Get a single fatwa
const getFatwaById = async (req, res) => {
  try {
    const fatwa = await Fatwa.findById(req.params.id);

    if (!fatwa) {
      return res.status(404).json({
        success: false,
        message: "Fatwa not found",
      });
    }

    res.status(200).json({
      success: true,
      data: fatwa,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch fatwa",
      error: error.message,
    });
  }
};

// Get fatwas by category
const getFatwasByCategory = async (req, res) => {
  try {
    const fatwas = await Fatwa.find({
      category: req.params.category,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: fatwas.length,
      data: fatwas,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch fatwas",
      error: error.message,
    });
  }
};

// Create a fatwa
const createFatwa = async (req, res) => {
  try {
    const { question, answer, category, hashtags } = req.body;

    const fatwa = await Fatwa.create({
      question,
      answer,
      category,
      hashtags,
    });

    res.status(201).json({
      success: true,
      message: "Fatwa created successfully",
      data: fatwa,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create fatwa",
      error: error.message,
    });
  }
};

// Update a fatwa
const updateFatwa = async (req, res) => {
  try {
    const { question, answer, category, hashtags } = req.body;

    const fatwa = await Fatwa.findByIdAndUpdate(
      req.params.id,
      {
        question,
        answer,
        category,
        hashtags,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!fatwa) {
      return res.status(404).json({
        success: false,
        message: "Fatwa not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Fatwa updated successfully",
      data: fatwa,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update fatwa",
      error: error.message,
    });
  }
};

// Delete a fatwa
const deleteFatwa = async (req, res) => {
  try {
    const fatwa = await Fatwa.findByIdAndDelete(req.params.id);

    if (!fatwa) {
      return res.status(404).json({
        success: false,
        message: "Fatwa not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Fatwa deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete fatwa",
      error: error.message,
    });
  }
};

module.exports = {
  getFatwas,
  getFatwaById,
  getFatwasByCategory,
  createFatwa,
  updateFatwa,
  deleteFatwa,
};
