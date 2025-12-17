const express = require("express");
const router = express.Router();
const rechargeController = require("../controllers/rechargeController");

// Routes
router.get("/", rechargeController.getAllRecharges);
router.post("/", rechargeController.createRecharge);

module.exports = router;
