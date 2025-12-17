const Recharge = require("../models/rechargeModel");
const Plan = require("../models/planModel");
const User = require("../models/userModel");

// GET all recharges (supports filtering by userId, userEmail, or mobileNumber)
exports.getAllRecharges = async (req, res) => {
  try {
    const { userId, userEmail, mobileNumber } = req.query;

    const query = {};
    if (userId) query.userId = userId;
    if (userEmail) query.userEmail = userEmail;
    if (mobileNumber) query.mobileNumber = mobileNumber;

    const recharges = await Recharge.find(query)
      .sort({ createdAt: -1 })
      .populate("userId", "name email")
      .populate("planId");

    res.json(recharges);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE recharge
exports.createRecharge = async (req, res) => {
  try {
    const {
      userId,
      userEmail,
      planId,
      mobileNumber,
      operator,
      planAmount,
      planDetails,
      status,
      referenceId
    } = req.body;

    if (!userId || !planId) {
      return res.status(400).json({ error: "userId and planId are required" });
    }

    if (!mobileNumber || !operator || !planAmount) {
      return res
        .status(400)
        .json({ error: "mobileNumber, operator, and planAmount are required" });
    }

    const [user, plan] = await Promise.all([
      User.findById(userId),
      Plan.findById(planId)
    ]);

    if (!user) return res.status(404).json({ error: "User not found" });
    if (!plan) return res.status(404).json({ error: "Plan not found" });

    const rechargePayload = {
      userId,
      userEmail: userEmail || user.email,
      planId,
      mobileNumber,
      operator: (operator || plan.operator || "").toUpperCase(),
      planAmount: Number(planAmount || plan.price),
      planDetails: planDetails || {
        data: plan.data,
        validity: plan.validity,
        calls: plan.calls
      },
      status: status || "SUCCESS",
      referenceId: referenceId || `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`
    };

    const newRecharge = new Recharge(rechargePayload);
    const savedRecharge = await (await newRecharge.save()).populate([
      { path: "userId", select: "name email" },
      { path: "planId" }
    ]);
    res.status(201).json(savedRecharge);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
