import React from 'react';
import './Jumbotron.css';

class Jumbotron extends React.Component {
    render(){
        return(
            <div className="myJumbotron jumbotron jumbotron-fluid">
                <div className="myJum container">
                    <h1 className="display-4">Scraped Articles</h1>
                    <p className="lead">New York Times Edition</p>
                </div>
            </div>
        )
    }

};

export default Jumbotron;