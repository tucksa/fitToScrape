import React, { Component,Fragment } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import './Articles.css'

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
        console.log('working?')
        axios.get('/api/articles')
        .then(res => {
            let title= [];
            // let link = [];
            // let content = [];
            // let id = [];
            res.data.title.map(i => title.push(i))
            // for (let i = 0; i < res.data.length; i++) {
            //     title.push(res.data[i].title)
            //     link.push(res.data[i].link)
            //     content.push(res.data[i].content)
            //     id.push(res.data[i].id)
            // };
            this.setState({
                title: title,
                // link: link,
                // content: content,
                // id: id
            });
            console.log(this.state.title);
        });
    };

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
        let articles = this.state.title.map( (x,i) => <Row id='atrDis' key={i} ><Col xs={3}><Link to={this.state.link}></Link></Col><Col xs={8}><h1>{this.state.title[i]}</h1><br /><p>{this.state.content[i]}...</p><button type="submit" onClick= {() => this.handleSaveArticle(this.state.id[i])} class="btn btn-danger">Save</button></Col></Row>)

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