const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

//  For registering a new user
exports.registerUser = async (req, res) => {
    const { username, address, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }


        // Create new user
        const newUser = new User({ username, address, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', newUser });

    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

// login user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }


        // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ message: `Login successful`, token, user });
    }

    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    } 

}

//Get user profile
exports.getUserProfile = async (req, res) => {
    const { userId } = req.params;

    try {
        // Find user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Return user profile
        res.status(200).json({ message: `User found`, user });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}