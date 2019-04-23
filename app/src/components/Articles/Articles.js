import React, { Component,Fragment } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'

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
    componentDidMount = () => {
        axios.get('/api/articles')
        .then(res => {
            let title= [];
            let link = [];
            let content = [];
            let id = [];
            for (let i = 0; i < res.data.length; i++) {
                title.push(res.data[i].title)
                link.push(res.data[i].link)
                content.push(res.data[i].content)
                id.push(res.data[i].id)
            };
            this.setState({
                title: title,
                link: link,
                content: content,
                id: id
            });
            console.log(this.state.title);
        });
    };
    render(){
        let articles = this.state.title.map( (x,i) => <Row id='title' key={i} ><Col xs={3}><Link to={this.state.link}></Link></Col><Col xs={8}><h1>{this.state.title[i]}</h1><br /><p>{this.state.content[i]}...</p></Col></Row>)

        return(
            <Fragment>
                <Container>
                    {articles}
                </Container>
            </Fragment>
       
        )
    }

};

export default Articles;