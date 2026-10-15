const Dhikr = require("../models/dhikrModel");

// Get all dhikrs
const getDhikrs = async (req, res) => {
  try {
    const dhikrs = await Dhikr.find().sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      count: dhikrs.length,
      data: dhikrs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "فشل تحميل الأذكار",
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
        message: "الذكر غير موجود",
      });
    }

    res.status(200).json({
      success: true,
      data: dhikr,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "فشل تحميل الذكر",
      error: error.message,
    });
  }
};

// Get dhikrs by category
const getDhikrsByCategory = async (req, res) => {
  try {
    const dhikrs = await Dhikr.find({
      category: req.params.category,
    }).sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      count: dhikrs.length,
      data: dhikrs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "فشل تحميل الأذكار",
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
      message: "تم إنشاء الذكر بنجاح",
      data: dhikr,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "فشل في إنشاء الذكر",
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
        message: "الذكر غير موجود",
      });
    }

    res.status(200).json({
      success: true,
      message: "تم تحديث الذكر بنجاح",
      data: dhikr,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "فشل في تحديث الذكر",
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
        message: "الذكر غير موجود",
      });
    }

    res.status(200).json({
      success: true,
      message: "تم حذف الذكر بنجاح",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "فشل في حذف الذكر",
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
