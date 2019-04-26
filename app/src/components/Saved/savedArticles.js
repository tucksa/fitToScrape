import React, { Component,Fragment } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';

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
    componentDidMount() {
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
        this.setState({
            id: e.target.attr('data-id')
        })
    };

    handleNoteSubmit = (e) => {
        e.preventDefault();
        let artId = e.target.attr('data-id')
        axios.post('api/articles/' + artId)
        .then(res => {
            console.log('successfully posted your note')
        })
        .catch (err => {
            console.log(err);
        });
    };

    handleDeleteNote = (e) => {
        e.preventDefault();
        let artId = e.target.attr('data-id')
        axios.delete('api/articles/' + artId)
        .then(res => {
            console.log('you successfully deleted your note- congratulations theres no evidence');
        })
        .catch(err => {
            console.log(err);
        });
    };
    

    render(){
        let articles = this.state.title.map( (x,i) => <Row id='title' key={i} ><Col xs={3}><Link to={this.state.link}></Link></Col><Col xs={8}><h1>{this.state.title[i]}</h1><button type="button" className="question btn btn-primary btn-lg" data-id= {this.state.id[i]} data-toggle="modal" data-target="#exampleModal" onClick= {this.handleAddNote}>Add Note</button><br /><p>{this.state.content[i]+ 'Notes: '+ this.state.note[i].map( i => <li>i<button type="submit" onClick= {this.handleDeleteNote} data-id= {this.state.id[i]} className="btn btn-danger">Delete</button></li>)} </p></Col></Row>)

        return(
            <Fragment>
                <Container>
                    {articles}
                    <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="myDisplay modal-dialog" role="document">
                            <div className="modal-content"> 
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Notes</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body" id="details">
                                    <form>
                                        <div className="form-group">
                                            <label for="exampleInputEmail1">Title: </label>
                                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                                        </div>
                                        <div className="form-group">
                                            <label for="exampleInputPassword1">Content</label>
                                            <input type="password" className="form-control" id="exampleInputPassword1"/>
                                        </div>
                                        <button type="submit" data-id= {this.state.id} onClick= {this.handleNoteSubmit} className="btn btn-primary">Submit</button>
                                    </form>
                                                                        
                                </div>
                                <div className="modal-footer">
                                    <a role="button" className="btn btn-secondary" data-dismiss="modal">Close</a>
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