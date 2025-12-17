const mongoose = require("mongoose");

const rechargeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      required: true
    },
    // Store email for lightweight auth flow on the frontend
    userEmail: {
      type: String,
      trim: true
    },
    mobileNumber: {
      type: String,
      required: true
    },
    operator: {
      type: String,
      enum: ["JIO", "AIRTEL", "VI", "BSNL"],
      required: true
    },
    planAmount: {
      type: Number,
      required: true
    },
    planDetails: {
      data: String,
      validity: String,
      calls: String
    },
    referenceId: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      enum: ["SUCCESS", "FAILED", "PENDING"],
      default: "SUCCESS"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recharge", rechargeSchema);
