import React, { Component } from 'react';
import PouchDB from 'pouchdb';
import { persistentStore, persistentReducer } from 'redux-pouchdb';
import { createStore, compose, applyMiddleware } from 'redux';

const db = new PouchDB('dbname');

//optional 
const applyMiddlewares = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  );
   
const createStoreWithMiddleware = compose(
    applyMiddlewares,
    persistentStore(db)
  )(createStore);
   
const store = createStoreWithMiddleware(reducer, initialState);

class List extends Component {
    // constructor () {
    //     //super();
    // }
    render () {
        return (
            <div>
                List
            </div> 
        )
    }
}

export default List;