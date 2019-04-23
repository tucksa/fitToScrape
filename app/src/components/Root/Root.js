import React, { Component } from 'react';
import './Root.css';
import { Link } from 'react-router-dom';
import axios from 'axios';


class Root extends Component{
    handleArticleScrape = () => {
        axios.post('/api/articles')
        .then(dbArticles => {
            console.log(dbArticles);
        })
        .catch(err => {
            console.log(err);
        })
    }
    render(){
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <h1 className="navbar-brand">Fit to Scrape</h1>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link to='/articles' className="nav-item nav-link active" href="#">Home</Link>
                            <Link to='/saved' className="nav-item nav-link" href="#">Saved</Link>
                            <button type="button" onClick= {this.handleArticleScrape} className="myNavBtn btn btn-success">Get More Articles</button>
                            <button type="button" className="myNavBtn btn btn-danger">Clear Articles</button>
                        </div>
                    </div>
                </nav>
                <div className="myJumbotron jumbotron jumbotron-fluid">
                    <div className="myJum container">
                        <h1 className="display-4">Scraped Articles</h1>
                        <p className="lead">New York Times Edition</p>
                    </div>
                </div>
            </div>
        )
    }

}

export default Root;