const Artwork = require('../models/artwork'); //importing the model for artwork

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

//updating artwork
exports.updateArtwork = async (req, res) => {
    
    const { id } = req.params;
    //destructure the request body
    try {
        // Await the result of the update
        const updatedArtwork = await Artwork.findByIdAndUpdate(id, {
            title,
            description,
            price,
            imageUrl,
            stockQuantity,
            category,
        }, { new: true });

        // Check if the artwork was found
        if (!updatedArtwork) {
            return res.status(404).json({ success: false, error: 'Artwork not found' });
        }

        // Return the updated artwork
        res.status(200).json({ success: true, data: updatedArtwork });
    } catch (error) {
        console.error(error);
        // Send error response if something goes wrong
        res.status(500).json({ success: false, error: 'An error occurred while updating the artwork' });
    }
};


//get all Artwork
exports.getAllArtwork = async (req, res) => {
    try {
        const artworks = await Artwork.find();
        res.status(200).json({success: true, data: artworks});
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

//filter artwork by category
// exports.Item = async (req, res) => {
//     try {
//         //get category from query parameter
//         const category = req.query.category;
        
//         //if category is provided, filter by category
//         if (category) {
//             const filteredArtwork = await Artwork.find({ category: category });
//             res.status(200).json({ success: true, data: filteredArtwork });
//         }else {
//             //if category is not provided, return all artwork
//             const allItems = await Item.find();
//             res.status(200).json({ success: true, data: allItems });
//         }
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// }

//filter artwork by category
exports.filterArtwork = async (req, res) => {
    //get category by param
    const { category } = req.params;
    try {
        //filter artwork by category
        const filteredArtwork = await Artwork.find({ category: category });
        res.status(200).json({ success: true, data: filteredArtwork });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

//delete artwork
exports.deletArtwork = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedArtwork = await Artwork.findByIdAndDelete(id);
        if (!deletedArtwork) {
            return res.status(404).json({ success: false, message: 'Artwork not found' });
        }
        res.status(200).json({ success: true, message: 'Artwork deleted successfully' });
    } catch (error) {
        res.json({ message: error})
    }
};


