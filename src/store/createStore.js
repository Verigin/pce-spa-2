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
}).on('error', function (err) {
    console.log(err);
});

//sync.cancel(); 

export default db;



