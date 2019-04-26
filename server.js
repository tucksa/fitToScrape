const express = require('express');
const mongoose = require('mongoose');
const logger = require("morgan");
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist";

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist", { useNewUrlParser: true } );


// Use Routes
app.use('/api', require('./routes/apiRoutes'));

// server listen to port
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});