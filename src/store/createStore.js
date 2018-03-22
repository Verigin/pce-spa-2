import PouchDB from 'pouchdb';
import { createStore, composer, applyMiddleware  } from 'redux';
import { PersistentStore, PersistantReducer } from 'redux-pouchdb';
import config from '../config';

const db = new PouchDB('pce-spa');

console.log(db.adapter);
console.log(config.couchDB('verigin.aleks@gmail.com', 'yalsaudo0603'),databaseName('verigin.aleks@gmail.com'));

const remotedb = createRemoteDatabase('verigin.aleks@gmail.com','yalsaudo0603');

function databaseName(username) {
    username = username.toLocaleLowerCase().trim();
    let result = "userdb-";
    for (let i=0; i < username.length; i++) {
        result += username.charCodeAt(i).toString(16);
    }
    return result;
}

function createRemoteDatabase (username, password) {
    let usernameLowercase = username.toLocaleLowerCase().trim();
    let remoteDB = new PouchDB(`${config.couchDB(usernameLowercase, password)}${databaseName(usernameLowercase)}`, {
        skip_setup: true
    });
    return remoteDB;
};

var sync = db.sync(remotedb, {
    live: true,
    retry: true
}).on('change', function (info) {
    console.log(info);    
}).on('paused', function (err) {
    console.log(err);
}).on('active', function () {
    // replicate resumed (e.g. new changes replicating, user went back online)
}).on('denied', function (err) {
    console.log(err);
}).on('complete', function (info) {
    console.log(info);
    //store.dispatch({type: 'CHANGE_DATA', playload: 'Smells like spirit'});

    
}).on('error', function (err) {
    console.log(err);
});

//sync.cancel(); 

const store = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

function reducer(state = [],action) {
    if (action.type === 'CHANGE_DATA')
    {
        //console.log('reducer', action.docs);             
        state = action.docs.slice();
        //  return [
        //      ...state,
        //    action.docs
        // ]
    }
    //console.log(action);
    return state;
}


console.log('getState ',store.getState());
//store.dispatch({type: 'CHANGE_DATA', playload: 'Smells like spirit'});

store.subscribe(() => {
    console.log('getState', store.getState());  
})

db.allDocs({
    include_docs: true,
    attachments: true
  }).then(function (result) {
    console.log(result);
    //var mylist = result.rows;
    const docs = result.rows
                    .map(row => row.doc)
                    .filter(doc => doc.type === 'item');
    console.log("from database", docs);                
    store.dispatch({
        type: 'CHANGE_DATA',
        docs
    });    
  }).catch(function (err) {
    console.log(err);
  });   

export default store;



