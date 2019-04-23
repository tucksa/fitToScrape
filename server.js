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

//, { useNewUrlParser: true }




const PORT= process.env.PORT || 5000;

//Use Routes
app.use('/api', require('./routes/apiRoutes'));


app.get('articles/:id', (req, res)=> {
    db.Article.findOne({ _id: req.params.id })
    .populate('note')
    .then(dbArticle => {
        res.json(dbArticle);
    })
    .catch(err => {
        res.json(err);
    });
});

app.post('/articles/:id', (req, res)=> {
    db.Note.create(req.body)
    .then(dbNote => {
        return db.Article.findOneAndUpdate({ _id: req.params.id}, { note: dbNote._id }, { new: true });
    })
    .then(dbArticle => {
        res.json(dbArticle);
    })
    .catch(err => {
        res.json(err);
    });
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });