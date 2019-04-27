import React, { Component,Fragment } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './Articles.css'
import {BrowserRouter} from 'react-router-dom';

class Articles extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: [],
            link: [],
            content: [],
            id: []
        }
    }
    componentDidMount= () => {
        axios.get('/api/articles')
        .then(res => {
            let title= [];
            let link= [];
            let content= [];
            let id= [];
            for(let i=0; i<res.data.length; i ++){
                title.push(i.title);
                link.push(i.link);
                content.push(i.content);
                id.push(i._id);
            }
            // res.data.map(i => title.push(i.title));
            // res.data.map(i => link.push(i.link));
            // res.data.map(i => content.push(i.content));
            // res.data.map(i => id.push(i._id));
            
            this.setState({
                title,
                link,
                content,
                id
            })            
        })
        .catch(err => {
            console.log(err)
        })
    }

    handleSaveArticle = id => {
        console.log(id)
        axios.post('api/saved/' + id)
        .then(res => {
            res.json('article saved!')
        })
        .catch(err => {
            console.log(err)
        })
    }
    render(){
        let articles = this.state.title.map( (x,i) => <Row id= 'artDis' key = {i}><Col xs = {10}><h4 className= 'title'>{x}</h4><br /><p>{this.state.content[i]}</p><br /><a href= {"http://www.nytimes.com/"+this.state.link[i]}> Read more </a></Col><Col xs= {1}><button className= 'myBtn btn btn-primary' onClick= {() => this.handleSaveArticle(this.state.id[i])}>Save</ button></Col></Row>)        
            
        return(
            <Fragment>
                <Container className= 'myContainer'>
                    <BrowserRouter>
                        {articles}
                    </BrowserRouter>                    
                </Container>
            </Fragment>
       
        )
    }

};

export default Articles;