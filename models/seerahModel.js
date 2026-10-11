const mongoose = require("mongoose");

const seerahSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },

    content: {
      type: String,
      required: [true, "Content is required"],
    },

    category: {
      type: String,
      enum: ["Seerah", "Miracles", "Battles"],
      required: [true, "Category is required"],
    },

    readingTime: {
      type: Number,
      required: [true, "Reading time is required"],
      min: [1, "Reading time must be at least 1 minute"],
    },

    image: {
      type: String,
      required: [true, "Image is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Seerah", seerahSchema);