const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
  {
    operator: {
      type: String,
      enum: ["JIO", "AIRTEL", "VI", "BSNL"],
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      enum: ["POPULAR", "ANNUAL", "DATA_ONLY", "TOP_UP"],
      required: true
    },
    validity: {
      type: String,
      required: true
    },
    data: {
      type: String,
      required: true
    },
    calls: {
      type: String,
      required: true
    },
    description: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Plan", planSchema);
