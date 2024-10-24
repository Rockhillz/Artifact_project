const Artwork = require('../models/Artwork'); //importing the model for artwork

//creating new artwork
exports.createArtwork = (req, res) => {
    //destructing the model
    const { title, description, price, imageUrl, stockQuantity, category } = req.body;
    try {
        //creating new artwork
        const newArtwork = new Artwork({
            title,
            description,
            price,
            imageUrl,
            stockQuantity,
            category,
        });
        const savedArtwork = newArtwork.save();
        res.status(201).json({success: true, data: savedArtwork});
    } catch (error) {
        res.status(500).json({success: false, error: error.message});
    };
}

// //updating artwork
// exports.update = (req, res) => {
    
//     const { id } = req.params;
// }


