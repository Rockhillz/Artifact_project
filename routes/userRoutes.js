const express = require('express'); // import express module
router = express.Router(); // create express router instance

// Import the user function from the userController
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');  

//import admin function from the adminControllers
const { promoteUser, demoteUser, getAllUsers, deleteUser, getAllArtworks, deleteArtwork } = require('../controllers/adminController'); 

//Import Middlewares
const { adminMiddleware } = require('../middlewares/adminMiddleware'); 
const { authMiddleware } = require('../middlewares/authMiddleware'); 

// Routes
router.post('/user/register', registerUser);  // creating the route for user registration
router.post('/user/login', loginUser);  // creating the route for user login
router.get('/user/profile/:userId', authMiddleware, getUserProfile);  // creating the route for user profile

// Admin routes
router.get('/admin/users', authMiddleware, adminMiddleware, getAllUsers);  // creating the route for admin to get all users
router.put('/admin/promote/:userId', authMiddleware, adminMiddleware, promoteUser);  // creating the route for admin to promote user
router.put('/admin/demote/:userId', authMiddleware, adminMiddleware, demoteUser);  // creating the route for admin to demote user
router.delete('/admin/users/:userId', authMiddleware, adminMiddleware, deleteUser);  // creating the route for admin to delete user
router.get('/admin/artworks', authMiddleware, adminMiddleware, getAllArtworks);  // creating the route for admin to get all artworks
router.delete('/admin/artworks/:artworkId', authMiddleware, adminMiddleware, deleteArtwork);  // creating the route for admin to delete artwork

module.exports = router;