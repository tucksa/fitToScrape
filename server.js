const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');

axios.get('https://www.nytimes.com/').then(response =>{
    const $ = cheerio.load(response.data);
    const results = [];
    $('article').each((i, element)=> {
        const title = $(element).find('h2').text();
        const link = $(element).find('a').attr("href");
        const liContent= $(element).find('li').text();
        const pContent = $(element).find('p').text();
        let content;
        liContent? content= liContent : content = pContent;        
        !content? console.log('------------------\n\n sorry '+ title + ' has no content') :
        results.push({
            title:title,
            link:link,
            content: content
        });
    });
    console.log(results);
});

