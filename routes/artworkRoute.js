const express = require('express'); //importing express
Router = express.Router(); //importing router from express

const { createArtwork } = require('../controllers/artworkController'); //importing the controller

Router.post('/createArtwork', createArtwork); //creating a new artwork

module.exports = Router;


