const express = require('express'); //importing express
Router = express.Router(); //importing router from express

const { createArtwork, getArtwork, deleteArtwork, getCategory } = require('../controllers/artworkController'); //importing the controller

Router.post('/createArtwork', createArtwork); //creating a new artwork
Router.get('/getArtwork', getArtwork); //getting all artworks
Router.delete('/deleteArtwork/:id', deleteArtwork); //deleting an artwork
Router.get('/getCategory/:category', getCategory); //getting artwork by category
module.exports = Router;


