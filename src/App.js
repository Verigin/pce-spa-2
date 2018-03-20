import React, { Component } from 'react';
import logo from './logo.svg';
import { Link } from 'react-router-dom'
//import { Link } from 'react-router';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
const cors = require('cors');


class App extends Component {

  
  render() {
    return (
      <div className="App1">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload. 
        </p>
        <div className='container'>
          <h1>App</h1>
          <ul>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/home'>Home</Link></li>
          </ul>
          {/* добавили вывод потомков */}
          {this.props.children}
      </div>

      </div>
     
    );
  }
}

export default App;
