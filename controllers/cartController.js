const cart = require("../model/Cart");

// In-memory "cart" for demonstration (in real-world, use a database)
let cart = [];

// Helper function to calculate total price
const calculateTotal = () => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

// 1. Add Item to Cart
exports.addToCart = (req, res) => {
    try {
    const { user, items, total, quantity } = req.body;
  
    const existingItem = cart.find(item => item.items === items);
    if (existingItem) {
      existingItem.quantity += quantity; // Increase quantity if item already in cart
    } else {
      cart.push({ user, items, total, quantity });
    }
  
    res.json({ message: 'Item added to cart', cart });
  } catch (error) {
      res.status(500).json({ message: 'Error adding item to cart', error });
  }
  };


// 2. Remove Item from Cart
exports.deleteFromCart = (req, res) => {
    try {
    const { items } = req.params;
  
    cart = cart.filter(item => item.items !== items);
  
    res.json({ message: 'Item removed from cart', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error adding item to cart', error });
}
};

// 3. Get Cart Items
exports.getCartItems = (req, res) => {
    res.json(cart) };


    
    // 4. Checkout (Purchase Items)
exports.checkpoutPurchaseItems = (req, res) => {
  if (cart.length === 0) {
    return res.status(400).json({ message: 'Your cart is empty!' });
  }

  const total = calculateTotal();
  
  // Clear the cart after checkout
  cart = [];

  res.json({ message: 'Purchase successful', total });
};

modules.exports = router;