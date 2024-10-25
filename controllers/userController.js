const bcrypt = require('bcryptjs');
const User = require("../models/User");
const jwt = require("jsonwebtoken");

//  For registering a new user
exports.registerUser = async (req, res) => {
    const { username, address, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        const existingUsername = await User.findOne({ username });
        if (existingUser || existingUsername) {
            return res.status(400).json({ message: "User  already exists" });
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

//Getting all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
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
    const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    console.log('User role:', user.role)
    console.log('Token payload:', jwt.decode(token))
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


//Update user profile
exports.updateUserProfile = async (req, res) => {
    const { userId } = req.params;
    const { username, address, email, password } = req.body;

    try {
        // Find user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update user profile
        user.username = username;
        user.address = address;
        user.email = email;
        user.password = password;

        await user.save();
        res.status(200).json({ message: "User profile updated successfully" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}