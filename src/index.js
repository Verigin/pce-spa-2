import React from 'react';
import ReactDOM from 'react-dom';
import {Provider } from 'react-redux';
import { BrowserRouter as Router,Route, Switch } from 'react-router-dom';

import store from './store/store.js';
import './index.css';
import App from './App';
import Login from './login/';
import Items from './items/';  

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path={"/"} component={App} />
                <Route path={"/login"} component={Login} />
                <Route path={"/list"} component={Items} />      
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
)



