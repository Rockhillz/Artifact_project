const express = require('express'); // import express module
router = express.Router(); // create express router instance
   
const { registerUser, loginUser } = require('../controllers/userController');  // Import the user function from the Usercontroller

// creating the route for user registration
router.post('/user/register', registerUser);



module.exports = router;