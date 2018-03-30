import {
  ADD_DEVICE_TOKEN,
  DELETE_ALL_DATA,
  DELETE_CONTACT,
  DELETE_ITEMS,
  DELETE_LIST,
  UPDATE_CONTACT,
  UPDATE_ITEM,
  UPDATE_LIST,
  UPDATE_SCALE,
  UPDATE_SETTINGS
} from '../constants'
import {
  // addDeviceToken,
  deleteDocument,
  // destroyLocalDatabase,
  updateDocument
} from '../../database'
import * as _ from 'underscore'
// import { createImageChange } from '../../model/documentCreator'
// import {
//   executeImageChange,
//   CHANGE_DELETE_IMAGE
// } from '../../model/changesExecuter'
// import { deleteChangeDocument } from '../../model/database'
// import { createImageChangeID } from '../../model/documentCreator'

// let removeItemReferenceFromLists = function (lists, itemIDs) {
//   lists.forEach(list => {
//     if (_.intersection(list.items, itemIDs).length !== 0) {
//       let newList = Object.assign({}, list)
//       newList.items = list.items.filter(itemID => !itemIDs.includes(itemID))
//       updateDocument(newList)
//     }
//   })
// }

// // when items are deleted all their images should be deleted from image storage as well as all add image changes.
// const addImageChangeDocuments = (items, itemIDs) => {
//   items.filter(item => itemIDs.includes(item._id)).forEach(item => {
//     item.images.forEach(image => {
//       if (image.imageReferenceId) {
//         const imageChange = createImageChange(
//           item._id,
//           image.imageReferenceId,
//           CHANGE_DELETE_IMAGE
//         )
//         executeImageChange(imageChange)
//       } else if (image.temporaryLocalReference) {
//         deleteChangeDocument(createImageChangeID(item._id, image._id))
//       }
//     })
//   })
// }

export const transferActionsToDatabase = store => next => action => {
  // console.log("in transferActionsToDatabase: " + action.type);
  if (action.type == UPDATE_ITEM) {
    // console.log("action recognized ! updating Database!");
    updateDocument(action.item)
  } else if (action.type == UPDATE_LIST) {
    // console.log("action UPDATE_LIST recognized ! updating Database!");
    updateDocument(action.list)
  } else if (action.type == UPDATE_CONTACT) {
    // console.log("action UPDATE_CONTACT recognized ! updating Database!");
    updateDocument(action.contact)
  } else if (action.type == UPDATE_SCALE) {
    let me = Object.assign({}, store.getState().me)
    if (!me.settings) {
      me.settings = {}
    }
    me.settings.scale = action.scale
    updateDocument(me)
  } else if (action.type == UPDATE_SETTINGS) {
    let me = Object.assign({}, store.getState().me)
    me.settings = Object.assign({}, action.settings)
    updateDocument(me)
  } else if (action.type == DELETE_LIST) {
    // console.log("action DELETE_LIST recognized ! updating Database!");
    deleteDocument(action.listID)
  } else if (action.type == DELETE_CONTACT) {
    // console.log("action DELETE_CONTACT recognized ! updating Database! id: " + action.contactID );
    deleteDocument(action.contactID)
  } else if (action.type == DELETE_ITEMS) {
    const { itemIDs } = action
    const { items, lists } = store.getState()

    // removeItemReferenceFromLists(lists, itemIDs)
    itemIDs.forEach(itemID => deleteDocument(itemID))
    // addImageChangeDocuments(items, itemIDs)
  } else if (action.type == ADD_DEVICE_TOKEN) {
    // console.log("action ADD_DEVICE_TOKEN recognized ! updating Database! deviceToken: " + action.deviceToken );
    // addDeviceToken(action.deviceToken)
  } else if (action.type == DELETE_ALL_DATA) {
    // console.log("action DELETE_ALL_DATA recognized ! updating Database!");
    // destroyLocalDatabase()
  }

  return next(action)
}
