const express = require('express');
const mongoose = require('mongoose');
const logger = require("morgan");
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log('Mongo is connected'))
  .catch(err => console.log(err));

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/static', express.static(path.join(__dirname, '/app/build/static')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/app/build/'))
});

// Use Routes
app.use('/api', require('./routes/apiRoutes'));

// server listen to port
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});