require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");

const productRoutes = require("./src/routes/productRoutes");
const userRoutes = require("./src/routes/userRoutes");
const rechargeRoutes = require("./src/routes/rechargeRoutes");
const planRoutes = require("./src/routes/planRoutes");

const app = express();
const port = 3000;

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    // Allow all localhost/127.* ports in dev
    if (!origin) return callback(null, true);
    const allowed = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin);
    if (allowed) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));
app.use(express.json());

// Database connection
connectDB();

// Routes
app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/recharges", rechargeRoutes);
app.use("/plans", planRoutes);

// Test route (optional)
app.get("/", (req, res) => {
  res.send("Backend running successfully 🚀");
});

// Server start
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

module.exports = app;
