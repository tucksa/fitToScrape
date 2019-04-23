const express = require('express');
const mongoose = require('mongoose');
//const logger = require("morgan");

const app= express();
const bodyParser = require('body-parser')

app.use(bodyParser.json());
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
.then(() => console.log('Mongo is connected'))
.catch(err => console.log(err));

// app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


const PORT= process.env.PORT || 5000;

//Use Routes
app.use('/api', require('./routes/apiRoutes'));



app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });