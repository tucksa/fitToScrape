import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar.js'
import Jumbotron from './components/Jumbotron/Jumbotron.js';
import Articles from './components/Articles/Articles.js';

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
      </div>
    );
  }
}

export default App;
