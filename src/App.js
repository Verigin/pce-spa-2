import React, { Component } from 'react';
import logo from './logo.svg';
import { Link } from 'react-router-dom'
//import { Link } from 'react-router';
import './App.css';
const cors = require('cors');


class App extends Component {
  
  
  render() {
    return (
      <div className="App1">       
        <div className='container'>
          <h1>App</h1>
          <ul>
            <li><Link to='/'>Home</Link></li>             
            <li><Link to='/login'>Login</Link></li>           
            <li><Link to='/list'>List</Link></li>
          </ul>
          {/* добавили вывод потомков */}
          {this.props.children}
      </div>

      </div>
     
    );
  }
}

export default App;
