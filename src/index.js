import React from 'react';
import ReactDOM from 'react-dom';
import {Provider } from 'react-redux';
import { BrowserRouter as Router,Route } from 'react-router-dom';
import Root from './components/Root';

import store from './store/store.js';
import './index.css';
import App from './App';
import Login from './login/';
import Items from './items/';  

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Root>
                <Route exact path={"/"} component={App} />
                <Route path={"/login"} component={Login} />
                <Route path={"/list"} component={Items} />      
            </Root>
        </Router>
    </Provider>,
    document.getElementById('root')
)



