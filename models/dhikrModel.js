const mongoose = require("mongoose");

const dhikrSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["morning", "night", "sleep", "prayer"],
    },

    count: {
        type: Number,
        required: true
    },
  },
  {
    timestamps: true,
  },
);

const Dhikr = mongoose.model("Dhikr", dhikrSchema);

module.exports = Dhikr;
