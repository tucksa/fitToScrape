import React, { Component } from 'react';
import './Navbar.css';
//import { Link } from 'react-router-dom';
//     <Link to='' className="nav-item nav-link active" href="#">Home</Link>
//<Link to='' className="nav-item nav-link" href="#">Saved</Link>

class Navbar extends Component{
    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <h1 className="navbar-brand">Fit to Scrape</h1>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                   
                        <button type="button" className="myNavBtn btn btn-success">Get More Articles</button>
                        <button type="button" className="myNavBtn btn btn-danger">Clear Articles</button>
                    </div>
                </div>
            </nav>
        )
    }

}

export default Navbar;