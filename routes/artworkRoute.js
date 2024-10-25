const express = require('express'); //importing express
Router = express.Router(); //importing router from express

const { createArtwork, getArtwork, deleteArtwork, getCategory, updateArtwork, searchArtwork, searchByDate, searchByPrice } = require('../controllers/artworkController'); //importing the controller

Router.post('/createArtwork', createArtwork); //creating a new artwork
Router.get('/getArtwork', getArtwork); //getting all artworks
Router.delete('/deleteArtwork/:id', deleteArtwork); //deleting an artwork
Router.get('/getCategory/:category', getCategory); //getting artwork by category
Router.post('/updateArtwork/:id', updateArtwork); //updating artwork by id
Router.get('/searchArtwork/:title', searchArtwork); //searching artwork by title
Router.get('/searchByDate/:startDate/:endDate', searchByDate); //searching artwork by date
Router.get('/searchByPrice', searchByPrice); //searching artwork by price
module.exports = Router;


