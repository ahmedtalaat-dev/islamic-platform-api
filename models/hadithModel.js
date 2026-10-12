const mongoose = require("mongoose");

const hadithSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["sahih", "daif", "nawawi", "qudsi"],
    },
  },
  {
    timestamps: true,
  },
);

const Hadith = mongoose.model("Hadith", hadithSchema);

module.exports = Hadith;
