const Transaction = require('../models/Transaction');
const User = require ('../models/User');


// Get buyer's transaction history
exports.getBuyerTransactions = async (req, res) => {
  
  try {
    const userId = req.user._id; // Assuming user is authenticated and ID is stored in req.user
    const transactions = await Transaction.find({buyer: userId})
    .populate('seller', 'name email') // populate seller's details (name, email)
    .select('item price transactionDate'); //select only the required field

    if (!transactions || transactions.length === 0 ){
      return res.status(404).json({ message: 'No transaction found.' });
    }

    return res.status(200).json({ transactions });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error.' })
  }
};

// Get seller's transaction history
exports.getSellerTransactions = async (req, res) => {
  
  try {
    const userId = req.user._id; // Assuming user is authenticated and ID is storeed in req.user
    const transactions = await Transaction.find({seller: userId})
    .populate('buyer', 'name email') // populate buyer's details (name, email)
    .select('item price transactionDate') // select only the required field

    if ( !transactions || transactions.length === 0 ) {
      return res.status(400).json({ message: 'No transaction found.' })
    }

    return res.status(200).json({ transactions });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error.' });
  }
};
