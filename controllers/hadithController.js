const Hadith = require("../models/hadithModel");

// Get all hadiths
const getHadiths = async (req, res) => {
  try {
    const hadiths = await Hadith.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: hadiths.length,
      data: hadiths,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch hadiths",
      error: error.message,
    });
  }
};

// Get a single hadith
const getHadithById = async (req, res) => {
  try {
    const hadith = await Hadith.findById(req.params.id);

    if (!hadith) {
      return res.status(404).json({
        success: false,
        message: "Hadith not found",
      });
    }

    res.status(200).json({
      success: true,
      data: hadith,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch hadith",
      error: error.message,
    });
  }
};

// Get hadiths by category
const getHadithsByCategory = async (req, res) => {
  try {
    const hadiths = await Hadith.find({
      category: req.params.category,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: hadiths.length,
      data: hadiths,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch hadiths",
      error: error.message,
    });
  }
};

// Create a hadith
const createHadith = async (req, res) => {
  try {
    const { content, category } = req.body;

    const hadith = await Hadith.create({
      content,
      category,
    });

    res.status(201).json({
      success: true,
      message: "Hadith created successfully",
      data: hadith,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create hadith",
      error: error.message,
    });
  }
};

// Update a hadith
const updateHadith = async (req, res) => {
  try {
    const { content, category } = req.body;

    const hadith = await Hadith.findByIdAndUpdate(
      req.params.id,
      {
        content,
        category,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!hadith) {
      return res.status(404).json({
        success: false,
        message: "Hadith not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Hadith updated successfully",
      data: hadith,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update hadith",
      error: error.message,
    });
  }
};

// Delete a hadith
const deleteHadith = async (req, res) => {
  try {
    const hadith = await Hadith.findByIdAndDelete(req.params.id);

    if (!hadith) {
      return res.status(404).json({
        success: false,
        message: "Hadith not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Hadith deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete hadith",
      error: error.message,
    });
  }
};

module.exports = {
  getHadiths,
  getHadithById,
  getHadithsByCategory,
  createHadith,
  updateHadith,
  deleteHadith,
};
