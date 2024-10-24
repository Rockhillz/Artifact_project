const cart = require("../models/Cart");

// Helper function to calculate total price
const calculateTotal = (cart) => {
  return cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
};



// 1. Add Item to Cart
exports.addToCart = async (req, res) => {
  try {
    const { user, items, total, quantity } = req.body;

    // Find the user's cart in the database
    let userCart = await Cart.findOne({ user }).populate('items');

    if (userCart) {
      // Check if the item already exists in the cart
      const existingItemIndex = userCart.items.findIndex(item => item.equals(items[0])); // Assuming items is an array of ObjectIds

      if (existingItemIndex !== -1) {
        // If item exists, increase its quantity
        userCart.quantity += quantity;
      } else {
        // If item does not exist, add it to the cart
        userCart.items.push(items[0]);
        userCart.quantity += quantity;
      }

      // Update the total price
      userCart.total = total; // Alternatively, recalculate the total dynamically
      await userCart.save(); // Save changes

    } else {
      // If the user's cart does not exist, create a new one
      userCart = new Cart({ user, items, quantity, total });
      await userCart.save();  // Save changes
    }
    const updatedCart = await Cart.findOne({ user }).populate('items');
    res.json({ message: 'Item added to cart', cart: updatedCart });

  } catch (error) {
    res.status(500).json({ message: 'Error adding item to cart', error });
  }
};
  



// 2. Remove Item from Cart
exports.deleteFromCart = async (req, res) => {
  try {
    const { user, itemId } = req.params;

    // Find the user's cart
    let userCart = await Cart.findOne({ user });

    if (!userCart) {
      return res.status(404).json({ message: 'Cart not found for user' });
    }

    // Find and remove the item from the cart
    const itemIndex = userCart.items.findIndex(item => item.equals(itemId));

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Remove the item from the cart
    userCart.items.splice(itemIndex, 1);
    userCart.quantity -= 1; // Adjust the quantity

    // Save the updated cart
    await userCart.save();

    res.json({ message: 'Item removed from cart', cart: userCart });

  } catch (error) {
    res.status(500).json({ message: 'Error removing item from cart', error });
  }
};



// 3. Get Cart Items
exports.getCartItems = async (req, res) => {
  try {
    const { user } = req.params;
    const userCart = await Cart.findOne({ user }).populate('items');

    if (!userCart) {
      return res.status(404).json({ message: 'Cart not found for user' });
    }

    res.json(userCart);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving cart items', error });
  }
};

    
  
// 4. Checkout (Purchase Items)
exports.checkoutPurchaseItems = async (req, res) => {
  try {
    const { user } = req.params;

    // Find the user's cart
    let userCart = await Cart.findOne({ user }).populate('items');

    if (!userCart || userCart.items.length === 0) {
      return res.status(400).json({ message: 'Your cart is empty!' });
    }

    // Calculate the total price (assuming it's stored in `total`)
    const total = userCart.total;

    // Optionally: Process the purchase logic here (e.g., payment gateway)

    // Clear the user's cart after checkout
    userCart.items = [];
    userCart.total = 0;
    userCart.quantity = 0;

    await userCart.save();

    res.json({ message: 'Purchase successful', total });

  } catch (error) {
    res.status(500).json({ message: 'Error during checkout', error });
  }
};

modules.exports = router;