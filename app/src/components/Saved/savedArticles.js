import React, { Component,Fragment } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'

class Saved extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: [],
            link: [],
            content: [],
            id: [],
            note: []
        }
    }
    componentDidMount = () => {
        axios.get('/api/saved')
        .then(res => {
            let title= [];
            let link = [];
            let content = [];
            let id = [];
            let note = [];
            for (let i = 0; i < res.data.length; i++) {
                title.push(res.data[i].title)
                link.push(res.data[i].link)
                content.push(res.data[i].content)
                id.push(res.data[i].id)
                note.push(res.data[i].note)
            };
            this.setState({
                title: title,
                link: link,
                content: content,
                id: id,
                note:note
            });
            console.log(this.state.title);
        });
       
    };

    handleAddNote = (e) => {
        e.preventDefault();
        // pop out note modal

        //get all current notes
        axios.get('api/articles/:id')
        .then(dbNote => {
            console.log(dbNote);
        })
        .catch(err => {
            console.log(err);
        });
    };

    handleNoteSubmit = (e) => {
        e.preventDefault();
        axios.post('api/articles/:id')
        .then(res => {
            console.log('successfully posted your note')
        })
        .catch (err => {
            console.log(err);
        });
    };

    handleDeleteNote = (e) => {
        e.preventDefault();
        axios.delete('api/articles/:id')
        .then(res => {
            console.log('you successfully deleted your note- congratulations theres no evidence');
        })
        .catch(err => {
            console.log(err);
        });
    };

    render(){
        let articles = this.state.title.map( (x,i) => <Row id='title' key={i} ><Col xs={3}><Link to={this.state.link}></Link></Col><Col xs={8}><h1>{this.state.title[i]}</h1><button type="button" class="question btn btn-primary btn-lg" data-toggle="modal" data-target="#exampleModal" onClick= {this.handleAddNote}>Add Note</button><br /><p>{this.state.content[i]}...</p><p>`Notes : ${this.state.note[i]}`</p></Col></Row>)

        return(
            <Fragment>
                <Container>
                    {articles}
                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="myDisplay modal-dialog" role="document">
                            <div class="modal-content"> 
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Notes</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body" id="details">
                                    <form>
                                        <div class="form-group">
                                            <label for="exampleInputEmail1">Title: </label>
                                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputPassword1">Content</label>
                                            <input type="password" class="form-control" id="exampleInputPassword1"/>
                                        </div>
                                        <button type="submit" onClick= {this.handleNoteSubmit} class="btn btn-primary">Submit</button>
                                        <button type="submit" onClick= {this.handleDeleteNote} class="btn btn-danger">Delete</button>
                                    </form>
                                                                        
                                </div>
                                <div class="modal-footer">
                                    <a role="button" class="btn btn-secondary" data-dismiss="modal">Close</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Fragment>
       
        )
    }

};

export default Saved;