import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.js';
// import homeRoute from './routes/Home';
// import savedRoute from './routes/Saved';
import Jumbotron from './components/Jumbotron/Jumbotron';
import Articles from './components/Articles/Articles';


class App extends Component {
  
  render() {

    return (
      //navbar- title, home link, saved articles link, scrape new articles btn, cleat articles btn
      //div for pic
      //Home: repeating article title, summary, picture, btn to save
      //Saved: repeating article title, summary, picture, btn to delet form saved & btn to add article note
      <div>
        <Navbar/>
        <Jumbotron/>
        <Articles/>
        {/* <BrowserRouter>
          <Navbar />
          <Route path='/home' component={homeRoute} />
          <Route path='/saved' component={savedRoute} /> 
        </BrowserRouter>     */}
      </div>
    );
  }
}

export default App;
