const express = require('express'); //importing express
Router = express.Router(); //importing router from express

const { createArtwork, updateArtwork, getAllArtwork, filterArtwork, deletArtwork } = require('../controllers/artworkController'); //importing the controller

Router.post('/createArtwork', createArtwork); //creating a new artwork
Router.put('/updateArtwork/:id', updateArtwork); //updating an artwork
Router.get('/getAllArtwork', getAllArtwork); //getting all artwork
Router.get('/filterArtwork/:category', filterArtwork); //filtering artwork by category
Router.delete('/deleteArtwork/:id', deletArtwork); //deleting an artwork




module.exports = Router;



