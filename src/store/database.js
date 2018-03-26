
import PouchDB from 'pouchdb';
import config from '../config';
import { getAllItems }  from '../actions/items';
import store from './store.js';
import { session } from "../session";

let db = new PouchDB('pce-spa6'); 
let sync = null;
let rep = null;

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
    console.log('connect to db',`${config.couchDB(usernameLowercase, password)}${databaseName(usernameLowercase)}`);
    let remoteDB = new PouchDB(`${config.couchDB(usernameLowercase, password)}${databaseName(usernameLowercase)}`, {
        skip_setup: true
    });
    return remoteDB;
};


function syncDB(username, password)
{
    const remotedb = createRemoteDatabase(username,password);
    console.log('start syncDB');      
    sync = db.sync(remotedb, {
        live: true,
        retry: true
    }).on('change', function (info) {
        console.log('change', info);
        store.dispatch(getAllItems());
    }).on('paused', function (err) {
        console.log('paused', err);
    }).on('active', function () {
        console.log('active');
    }).on('denied', function (err) {
        console.log('denied', err);
    }).on('complete', function (info) {
        console.log('complete', info);
    }).on('error', function (err) {
        console.log('error', err);
    });
}

export function sinhronize(username, password) {
    db.get('me').then(function (doc) {
        console.log("found username in local db : " + doc.email + " logged in user: " + username);
        if (doc.email.toLocaleLowerCase().trim() == username.toLocaleLowerCase().trim()) {
            syncDB(username, password);
        } else {
            console.log("destroying database");
            db.destroy().then(function () {
                db = new PouchDB('pce-spa6');
                const remotedb = createRemoteDatabase(username, password);
                syncDB(username, password);
            });
        }
    }).catch(function (err) {
        console.log(" could not read user from local db. maybe it's the first app init" + err);
        syncDB(username, password);
    });
}


export function cancelSync () {
    //rep.cancel();  
    sync.cancel(); 
}


export default db;