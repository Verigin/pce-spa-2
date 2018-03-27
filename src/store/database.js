
import PouchDB from 'pouchdb';
import config from '../config';
import { onGetAllItems }  from '../actions/items';
import store from './store.js';
import { session } from "../session";

let db = null;
// let db = createRemoteDatabase('pcespa5@mail.ru','pcespa5');
let sync = null;
let rep = null;
let changes = null;

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

export function openRemoteDb(username, password) {
    db = createRemoteDatabase(username,password);
    console.log('open remote db ...');
    getAllItems();
    changes = db.changes({
        since: 'now',
        live: true,
        timeout: 2000,
        include_docs: true
      }).on('change', function(change) {
        console.log('change');  
        //store.dispatch(getAllItems());
        getAllItems();
      }).on('complete', function(info) {
        // changes() was canceled
      }).on('error', function (err) {
        console.log(err);
      });    
}

export function closeRemoteDb() {
    console.log('close remote db ...');
    changes.cancel(); 
}

export function getAllItems(){
    db.allDocs({
        include_docs: true,
        attachments: true
    }).then(function (result) {
        const docs = result.rows
            .map(row => row.doc)
            .filter(doc => doc.type === 'item');
        console.log("getAllItems from database", docs);                
        store.dispatch({type: 'CHANGE_DATA',docs});    
    }).catch(function (err) {
        console.log(err);
    }); 
}



// function syncDB(username, password)
// {
//     const remotedb = createRemoteDatabase(username,password);
//     console.log('start syncDB');      
//     sync = db.sync(remotedb, {
//         live: true,
//         retry: true
//     }).on('change', function (info) {
//         console.log('change', info);
//         store.dispatch(getAllItems());
//     }).on('paused', function (err) {
//         console.log('paused', err);
//     }).on('active', function () {
//         console.log('active');
//     }).on('denied', function (err) {
//         console.log('denied', err);
//     }).on('complete', function (info) {
//         console.log('complete', info);
//     }).on('error', function (err) {
//         console.log('error', err);
//     });
// }

// export function sinhronize(username, password) {
//     db.get('me').then(function (doc) {
//         console.log("found username in local db : " + doc.email + " logged in user: " + username);
//         if (doc.email.toLocaleLowerCase().trim() == username.toLocaleLowerCase().trim()) {
//             syncDB(username, password);
//         } else {
//             console.log("destroying database");
//             db.destroy().then(function () {
//                 db = new PouchDB('pce-spa6');
//                 const remotedb = createRemoteDatabase(username, password);
//                 syncDB(username, password);
//             });
//         }
//     }).catch(function (err) {
//         console.log(" could not read user from local db. maybe it's the first app init" + err);
//         syncDB(username, password);
//     });
// }


// export function cancelSync () {
//     //rep.cancel();  
//     sync.cancel(); 
// }


//export default db;