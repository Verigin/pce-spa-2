import { createStore } from 'redux';
import { Provider } from 'react-redux';
import React, { Component } from 'react';
import Item from './item';
import store from '../store/createStore.js';

class List extends Component {

    render (){
        return (                
        <Provider store={store}>                
            <Item />
        </Provider>
        )
    }
}

export default List;

