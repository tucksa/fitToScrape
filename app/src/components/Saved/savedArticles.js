import React, { Component,Fragment } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.css';
import './savedArticles.css';

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
            let link= [];
            let content= [];
            let id= [];
            let note= []
            res.data.map(i => title.push(i.title));
            res.data.map(i => link.push(i.link));
            res.data.map(i => content.push(i.content));
            res.data.map(i => id.push(i._id));
            res.data.map(i => note.push(i.note));
            
            this.setState({
                title,
                link,
                content,
                id,
                note
            })            
        })
        .catch(err => {
            console.log(err)
        })
       
    };

    handleAddNote = (e) => {
  
    };

    handleNoteSubmit = id => {
        axios.post('api/articles/' + id)
        .then(res => {
            console.log('successfully posted your note')
        })
        .catch (err => {
            console.log(err);
        });
    };

    handleDeleteNote = id => {
        axios.delete('api/articles/' + id)
        .then(res => {
            console.log('you successfully deleted your note- congratulations theres no evidence');
        })
        .catch(err => {
            console.log(err);
        });
    };
    

    render(){
        let articles = this.state.title.map( (x,i) => <Row id= 'artDis' key = {i}><Col xs = {10}><h4 className= 'title'>{x}</h4><br /><p>{this.state.content[i]}</p><br /><p>Notes: <ul>{this.state.note[i].map(i => <li>{i.title}<button type="submit" onClick= {() => this.handleDeleteNote(i._id)} className="btn btn-danger">Delete</button><br /> {i.body}</li>)}</ul></p><a href= {"http://www.nytimes.com/"+this.state.link[i]}> Read more </a> <button type="button" className="question btn btn-primary btn-lg" data-toggle="modal" data-target="#exampleModal" onClick= {() => this.handleAddNote(this.state.id[i])}>Add Note</button></Col><Col xs= {1}><button className= 'myBtn btn btn-danger' onClick= {() => this.handleSaveArticle(this.state.id[i])}>Save</ button></Col></Row>)        
            
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