const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Sign up
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //Checking id user exsists
    const exsistingUser = await User.findOne({ email });
    if (exsistingUser)
      return res.status(400).json({ message: "Email already in use" });

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create User
    const newUser = new User({ name, email, passwordHash });
    await newUser.save();

    res.status(201).json({ message: "User registred successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid ceredentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
