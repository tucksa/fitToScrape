import React from 'react';

class Articles extends React.Component {
    render(){
        return(
            <div className='row'>
                <div className= 'col-3'>
                    <img alt="" src= ""/>
                </div>
                <div className= 'col-7'>
                    <h3 className= 'artTitle'>Title goes here</h3><span><button type='button'>Save</button></span>
                    <p>insert a brief article desciption</p>
                </div>
            </div>
        )
    }

};

export default Articles;