const mongoose = require("mongoose");

const SettingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    colorMode: {
      type: String,
      enum: "dark" | "light" | "system",
      default: "light",
      required: true,
    },
    direction: {
      type: String,
      enum: "ltr" | "rtl",
      default: "ltr",
      required: true,
    },
    presets: {
      type: String,
      default: "blue",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Setting", SettingSchema);
