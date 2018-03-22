import { createStore } from 'redux';
import { Provider } from 'react-redux';
import React, { Component } from 'react';
import Item from './item';

class List extends Component {

    render (){
        return (
        <Provider>                
            <Item />
        </Provider>
        )
    }
}

export default List;

