const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required:
    true },

    total: { type: Number, default: 0 },


    quantity: { type: Number, default: 0 },

    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artwork' }]
    });

    module.exports = mongoose.model("Cart", CartSchema);