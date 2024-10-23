const mongoose = require("mongoose");

const ArtworkSchema = new mongoose.Schema({
    title: { type: String, required: true },

    description: { type: String },

    price: { type: Number, required: true },

    imageUrl: { type: String },

    stockQuantity: { type: Number, required: true },

    category: {
        type: String, 
        required: true
    },
    
    status: { type: String, enum: ['available', 'sold'], default:
    'available' },

    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default:
    null },
    

    datePosted: { type: Date, default: Date.now }
    });

    module.exports = mongoose.model("Artwork", ArtworkSchema);