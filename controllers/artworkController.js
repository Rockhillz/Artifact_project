const Artwork = require('../models/Artwork'); //importing the model for artwork

//creating new artwork
exports.createArtwork = async (req, res) => {
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
        newArtwork.save();
        res.status(201).json({success: true, data: newArtwork});
    } catch (error) {
        res.status(500).json({message:'Error creating artwork', error});
    };
}

exports.getArtwork = async (req, res) => {
    try {
        const artworks = await Artwork.find();
        res.status(200).json({success: true, data: artworks});
    } catch (error) {
        res.status(500).json({message:'Error fetching artworks', error});
    };
}

exports.deleteArtwork = async (req, res) => {
    try {
        const { id } = req.params;
        const artwork = await Artwork.findByIdAndDelete(id);
        if (!artwork) {
            return res.status(404).json({ success: false, message: 'Artwork not found'});
        }
        res.status(200).json({ success: true,  message: 'Artwork deleted successfully'});
    } catch (error) {
        res.status(500).json({message: 'Error deleting artwork', error});
    };
}


//get single artwork by category
exports.getCategory = async (req, res) => {
    //extract category
    const { category } = req.params;
    try {
        const artwork = await Artwork.find({ category });

        if (artwork.length === 0) {
            return res.status(404).json({ success: false, message: 'Artwork not found'});
        }
        res.status(200).json({ success: true, data: artwork});
    } catch (error) {
        res.status(500).json({message: 'Error fetching artwork', error});
    };
}


