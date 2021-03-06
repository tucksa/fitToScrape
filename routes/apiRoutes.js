const router = require('express').Router();
const db= require('../models/index');
const cheerio = require('cheerio');
const axios = require('axios');


//router Get all articles
router.get('/articles', (req,res)=> {
    db.Article.find({})
    .sort({ date: -1 })
    .then(dbArticle => {
        res.json(dbArticle);
    })
    .catch(err => {
        res.json(err);
    });
});
 
// router add new articles from nyt scrape
router.post('/articles', (req,res) => {
    axios.get('https://www.nytimes.com/').then(response =>{
        const $ = cheerio.load(response.data);
    
        $('article').each((i, element)=> {
            const title = $(element).find('h2').text();
            const link = $(element).find('a').attr("href");
            const liContent= $(element).find('li').text();
            const pContent = $(element).find('p').text();
            let content;
            liContent? content= liContent : content = pContent;        
            !content? console.log('------------------\n\n sorry '+ title + ' has no content') :
            db.Article.create({
                title,
                link,
                content
            }).then(dbArticle => {
                console.log(dbArticle);
            }).catch(err =>{
                console.log(err);
            });
        });
        res.json('successfully posted the scraped articles');
    });
});

// router get all notes associated with article
router.get('saved', (req, res)=> {
    db.Article.find({ isSaved: true })
    .populate('Note')
    .then(dbArticle => {
        res.json(dbArticle);
    })
    .catch(err => {
        res.json(err);
    });
});

// router add a note to the database associated with article
router.post('/articles/:id', (req, res)=> {
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

router.delete('/articles/:id', (req,res) => {
    db.Note.deleteOne({ _id: req.params.id})
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    })

});

//saving articles 
router.put('/saved/:id', (req, res) => {
    db.Article.findOneAndUpdate({ _id: req.params.id}, { isSaved: true })
    .then(update => {
        update.json('you saved an article!')
    })
    .catch(err => {
        console.log(err)
    })

})
    

module.exports = router