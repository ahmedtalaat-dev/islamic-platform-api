const mongoose = require("mongoose");

const fatwaSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },

    answer: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["Worship", "Transactions", "Ethics"],
    },

    hashtags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const Fatwa = mongoose.model("Fatwa", fatwaSchema);

module.exports = Fatwa;
