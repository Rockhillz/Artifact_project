const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config()
const artRoute = require('./routes/artworkRoute');

//import routes
const userRoutes = require("./routes/userRoutes");

const dbUrl = process.env.MONGODB_URL;


mongoose
  .connect(dbUrl)
  .then(() => {
    console.log(`Connected to MongoDB`);
    const app = express(); //create express instance
    const port = 5589; // create port

    //middleware
    app.use(express.json()); // parsing our json data

    // mounting routes on /api
    app.use("/api", userRoutes);
    app.use('/api', artRoute);


    app.get("/", (req, res) => {
      res.send("<h1> Hello, Welcome </h1>");
    });

    app.listen(port, () => {
      console.log(`😍😍 New Serverlistening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(`Failed to connect to mongoDB`, err);
  });

