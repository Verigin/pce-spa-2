
import PouchDB from 'pouchdb';
import config from '../config';
import { getAllItems }  from '../actions/items';
import store from './store.js';
import { session } from "../session";

const db = new PouchDB('pce-spa5');
var sync = null;
var rep = null;

//обернуть все в функцию синхронизации при логине
export function sinhronize(username,password)
{


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

const remotedb = createRemoteDatabase(username,password);


    // db.allDocs({
    //     include_docs: true,
    //     attachments: true
    // }).then(function (result) {
    //     // Promise isn't supported by all browsers; you may want to use bluebird
    //     return Promise.all(result.rows.map(function (row) {
    //         return db.remove(row.id, row.value.rev);
    //     }));
    // }).then(function () {

    // rep = db.replicate.from(remotedb, {
    //     live: true,
    //     retry: true
    // }).on('change', function (info) {
    //     console.log('change', info);
    //     store.dispatch(getAllItems());
    // }).on('paused', function (err) {
    //     console.log('paused',err);
    // }).on('active', function () {  
    //     console.log('active'); 
    // }).on('denied', function (err) {
    //     console.log('denied',err);
    // }).on('complete', function (info) {
    //     console.log('complete',info);  
    // }).on('error', function (err) {
    //     console.log('error',err);
    // });    


//   }).catch(function (err) {
//     // error!
//   });

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

export function cancelSync () {
    //rep.cancel();  
    sync.cancel(); 
}


export default db;