import React, { Component } from 'react';
import db from '../store/createStore.js';

var mylist = null;

class List extends Component {
    constructor (props) {
        super(props);
        this.state = {
            list: [{doc: {artist:'loadingg...'}}]
        }    
        this.onLoad=this.onLoad.bind(this);
    }   

    onLoad(event) {
        event.preventDefault(); 
        console.log('onLoad');
        this.setState({ list: [{doc: {artist:'starting...'}}] }); 
        let mythis = this; 
        db.allDocs({
            include_docs: true,
            attachments: true
          }).then(function (result) {
            console.log(result);
            mylist = result.rows;
            console.log(mylist);            
            mythis.setState({ list: mylist });     
          }).catch(function (err) {
            console.log(err);
          });  
    }       

    render () {
        return (
            <div>
                {this.state.list.map((item,index)=>
                <li key={index}>{item.doc.artist}</li>
                )}
                <button onClick={this.onLoad}>Обновить</button>             
            </div> 
        )
    }
}

export default List;