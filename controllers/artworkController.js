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

//updating artwork by id
exports.updateArtwork = async (req, res) => {
    const { id } = req.params;
    //destructing the model
    const { title, description, price, imageUrl, stockQuantity, category } = req.body;
    try {
        const updatedArtwork = await Artwork.findByIdAndUpdate(
            id,
            {
                title,
                description,
                price,
                imageUrl,
                stockQuantity,
                category,
            },
            { new: true }
        );
        if (!updatedArtwork) {
            return res.status(404).json({ success: false, message: 'Artwork not found'});
        }
        res.status(200).json({ success: true, data: updatedArtwork});
    } catch (error) {
        res.status(500).json({message: 'Error updating artwork', error});
    };
}


//search for Artwork by title
exports.searchArtwork = async (req, res) => {
    const { title } = req.params;
    try {
        const artwork = await Artwork.find({ title });
        if (artwork.length === 0) {
            return res.status(404).json({ success: false, message: 'Artwork not found'});
        }
        res.status(200).json({ success: true, data: artwork});
    } catch (error) {
        res.status(500).json({message: 'Error fetching artwork', error});
    };
}



//search by dateposted
exports.searchByDate = async (req, res) => {
    const { startDate, endDate } = req.params;

    //check for missing or invalid date
    if (!startDate || !endDate) {
        return res.status(400).json({ success: false, message: 'Missing start or end date'});
    }

    try {
        const artwork = await Artwork.find({ datePosted: { $gte: startDate, 
        $lte: endDate } });

        res.json(artwork)
    } catch{
        res.status(500).json({ success: false, message: 'Error occured while fetching artwork'});
    }
}

//search by price range
exports.searchByPrice = async (req, res) => {
    const { minPrice, maxPrice, exactPrice } = req.query;

    // Check for price range parameters
    if (minPrice && maxPrice) {
        try {
            const artworksInRange = await Artwork.find({
                price: {
                    $gte: Number(minPrice),
                    $lte: Number(maxPrice)
                }
            });
            return res.json(artworksInRange);
        } catch (error) {
            return res.status(500).json({ error: 'An error occurred while retrieving artworks in the specified price range.' });
        }
    }

    // Check for exactPrice to get all artworks with that exact price
    if (exactPrice) {
        try {
            const artworksWithExactPrice = await Artwork.find({
                price: Number(exactPrice)
            });
            return res.json(artworksWithExactPrice);
        } catch (error) {
            return res.status(500).json({ error: 'An error occurred while retrieving artworks with the specified exact price.' });
        }
    }

    // If no valid parameters provided, return a 400 error
    return res.status(400).json({ error: 'Please provide either minPrice and maxPrice for a price range search, or exactPrice for exact price search.' });
};

