
import PouchDB from 'pouchdb';
import config from '../config';
import { getAllItems }  from '../actions/items';
import store from './store.js';
import { session } from "../session";

const db = new PouchDB('pce-spa');
const remotedb = createRemoteDatabase(session.user.email,session.user.password);

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
    console.log('change', info);
    store.dispatch(getAllItems());
}).on('paused', function (err) {
    console.log(err);
}).on('active', function () {    
    
}).on('denied', function (err) {
    console.log(err);
}).on('complete', function (info) {
    console.log(info);  
}).on('error', function (err) {
    console.log(err);
});

//sync.cancel(); 

export default db;