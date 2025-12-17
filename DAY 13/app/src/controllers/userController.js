const User = require("../models/userModel");

// GET all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE user (Signup)
exports.createUser = async (req, res) => {
  try {
    console.log("Signup Request Body:", req.body);
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    console.log("User saved:", savedUser);
    res.status(201).json(savedUser);
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(400).json({ error: err.message });
  }
};

const jwt = require("jsonwebtoken");

// LOGIN user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.email === 'admin@admin.com' }, // Payload
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // Token expiry
    );

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isAdmin: user.email === 'admin@admin.com'
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
