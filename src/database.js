import PouchDB from 'pouchdb'
import config from './config'
import { updateDocumentsFromDatabase, clearStore } from './shared/actions'
import store from './shared/store'

let db = null
let changes = null

function databaseName (username) {
  username = username.toLocaleLowerCase().trim()
  let result = 'userdb-'
  for (let i = 0; i < username.length; i++) {
    result += username.charCodeAt(i).toString(16)
  }
  return result
}

function createRemoteDatabase (username, password) {
  let usernameLowercase = username.toLocaleLowerCase().trim()
  console.log(
    'connect to db',
    `${config.couchDB(usernameLowercase, password)}${databaseName(usernameLowercase)}`
  )
  let remoteDB = new PouchDB(
    `${config.couchDB(usernameLowercase, password)}${databaseName(usernameLowercase)}`,
    {
      skip_setup: true
    }
  )
  return remoteDB
}

export async function updateDocument (document) {
  document.lastModified = Date.now()

  try {
    let response = await db.put(document)
    // PouchDB Response example:
    // {
    //   "ok": true,
    //   "id": "mydoc",
    //   "rev": "1-A6157A5EA545C99B00FF904EEF05FD9F"
    // }
    // Now we have to bring the new rev back into the Redux state,
    // or any following update would create a conflict.
    // console.log(`[db] Updated ${document.type} document in PouchDB. ${document._id}`);
    document._rev = response.rev
    store.dispatch(updateDocumentsFromDatabase([document], []))
  } catch (error) {
    // console.warn(`[db] ${error.name} error updating ${document.type} document in PouchDB. ${document._id}`);
    if (error.name === 'conflict') {
      // // If it's a conflict, we're going to merge and then retry with the current _rev.
      // const latestDocument = await db.get(document._id)
      // const mergedDocument = mergeItems(document, latestDocument)
      // mergedDocument._rev = latestDocument._rev
      // return updateDocument(mergedDocument)
    }
  }
}

export function deleteDocument (documentID) {
  db
    .get(documentID)
    .then(function (doc) {
      // console.log("removing document from database");
      return db.remove(doc)
    })
    .catch(function (err) {
      // console.log("Could not delete document from database " + err);
    })
}

function listenCnanges () {
  changes = db
    .changes({
      since: 'now',
      live: true,
      timeout: 2000,
      include_docs: true
    })
    .on('change', function (change) {
      console.log('change')
      // console.log(change)
      const docs = new Array(change.doc)
      // console.log(docs)
      const updatedDocs = docs.filter(doc => !doc._deleted)
      const deletedDocs = docs.filter(doc => doc._deleted === true)
      console.log('deletedDocs', deletedDocs)
      console.log('updatedDocs', updatedDocs)
      // Send the changed document to Redux
      store.dispatch(updateDocumentsFromDatabase(updatedDocs, deletedDocs))
    })
    .on('complete', function (info) {
      // changes() was canceled
    })
    .on('error', function (err) {
      console.log('recreate listener')
      changes.cancel()
      listenCnanges()
      console.log(err)
    })
}

export function openRemoteDb (username, password) {
  db = createRemoteDatabase(username, password)
  console.log('open remote db ...')

  transferLocalDocumentsToRedux()

  // getAllItems()

  listenCnanges()
}

export function closeRemoteDb () {
  console.log('close remote db ...')
  changes.cancel()
  clearStore()
}

async function transferLocalDocumentsToRedux () {
  const result = await db.allDocs({
    include_docs: true,
    attachments: true
  })
  const docs = result.rows.map(row => row.doc)
  if (docs.length > 0) {
    console.log(result)
    console.log(docs)
    store.dispatch(updateDocumentsFromDatabase(docs, []))
  }
}
