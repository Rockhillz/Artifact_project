const express = require('express');
router = express.Router();

const { getBuyerTransactions, getSellerTransactions } = require('../controllers/transactionController'); // Import the getBuyerTransactions function from the transactionController
const { authMiddleware } = require('../middlewares/authMiddleware'); //Middleware to protect routes


// Route for buyers to get their transaction history
router.get('/buyer', authMiddleware, getBuyerTransactions);
router.get('/seller', authMiddleware, getSellerTransactions);




module.exports = router