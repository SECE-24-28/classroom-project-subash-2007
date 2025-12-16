const Plan = require("../models/planModel");

// GET plans (optionally filter by operator)
exports.getPlans = async (req, res) => {
  try {
    const { operator } = req.query;
    const query = operator ? { operator: operator.toUpperCase() } : {};
    const plans = await Plan.find(query).sort({ updatedAt: -1 });
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE plan (admin use)
exports.createPlan = async (req, res) => {
  try {
    const payload = {
      operator: (req.body.operator || "").toUpperCase(),
      price: req.body.price,
      category: req.body.category,
      validity: req.body.validity,
      data: req.body.data,
      calls: req.body.calls,
      description: req.body.description,
      sms: req.body.sms
    };
    const plan = await Plan.create(payload);
    res.status(201).json(plan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE plan
exports.updatePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Plan.findByIdAndUpdate(
      id,
      { ...req.body, operator: (req.body.operator || "").toUpperCase() },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: "Plan not found" });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE plan
exports.deletePlan = async (req, res) => {
  try {
    const { id } = req.params;
    await Plan.findByIdAndDelete(id);
    res.json({ message: "Plan deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
