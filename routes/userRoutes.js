const express = require('express'); // import express module
router = express.Router(); // create express router instance
   
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');  // Import the user function from the Usercontroller

// Routes
router.post('/user/register', registerUser);  // creating the route for user registration
router.post('/user/login', loginUser);  // creating the route for user login
router.get('/user/profile/:userId', getUserProfile);  // creating the route for user profile


module.exports = router;