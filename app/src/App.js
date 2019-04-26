import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Root from './components/Root/Root.js';
import homeRoute from './routes/Home';
import savedRoute from './routes/Saved';

import Articles from './components/Articles/Articles';
import Saved from './components/Saved/savedArticles';


class App extends Component {
  
  render() {

    return (
      //navbar- title, home link, saved articles link, scrape new articles btn, cleat articles btn
      //div for pic
      //Home: repeating article title, summary, picture, btn to save
      //Saved: repeating article title, summary, picture, btn to delet form saved & btn to add article note
      //   <IndexRoute component= {Articles}/>
      //history= {browerHistory}
      <BrowserRouter >
          <Root/>
          <Route path= '/articles' component = {homeRoute}/>
          <Route path = '/saved' component ={savedRoute} />
      </BrowserRouter>
    );
  }
}

export default App;
