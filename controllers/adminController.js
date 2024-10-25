const User = require("../models/User");
const Artwork = require("../models/Artwork");

// Promote user to admin
exports.promoteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndUpdate(
            userId,
            { role: 'admin' },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User promoted to admin successfully', user: user });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Demote user from admin to user
exports.demoteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndUpdate(
            userId,
            { role: 'user' },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User demoted to user successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}


// Admin Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};


// Admin Delete user
exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};


// Admin Get all artworks
exports.getAllArtworks = async (req, res) => {
    try {
        const artworks = await Artwork.find();
        res.status(200).json(artworks);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};


// Admin Delete artwork
exports.deleteArtwork = async (req, res) => {
    try {
        const { artworkId } = req.params;
        const artwork = await Artwork.findByIdAndDelete(artworkId);
        if (!artwork) {
            return res.status(404).json({ error: "Artwork not found" });
        }
        res.status(200).json({ message: "Artwork deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
