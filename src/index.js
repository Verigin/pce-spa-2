import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './login/';
import Root from "./components/Root";
import Home from "./components/Home";
import { browserHistory} from "react-router";
//import PouchDB from 'pouchdb-react';

//import { Router, Route  } from 'react-router'
//import { Router, Route, BrowserRouter  } from 'react-router-dom'
import {
    BrowserRouter as Router,
    Route
  } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';

//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
    <Router>
    <div>
        <Root>
            <Route exact path={"/"} component={App} />    
            <Route path={"/login"} component={Login} />    
            <Route path={"/home"} component={Home} />
            
        </Root>
    </div>
</Router>,
    document.getElementById('root')
  )
registerServiceWorker();


