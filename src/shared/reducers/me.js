import {
  UPDATE_DOCUMENTS_FROM_DATABASE,
  UPDATE_SCALE,
  UPDATE_SETTINGS
} from '../constants'

export default function me (state, action) {
  if (!state) {
    state = { settings: { scale: '1' } }
  }

  switch (action.type) {
    case UPDATE_DOCUMENTS_FROM_DATABASE: {
      const meArray = action.updatedDocuments.filter(doc => doc._id === 'me')
      if (meArray.length) {
        const me = meArray[meArray.length - 1]
        let settings = Object.assign({}, me.settings)
        // settings = ensureDefaultSettings(settings)
        state = me
        state.settings = settings
      }
      break
    }
    case UPDATE_SETTINGS: {
      let me = Object.assign({}, state)
      me.settings = Object.assign({}, action.settings)
      state = me
      break
    }
    case UPDATE_SCALE: {
      // only update state if the object is freshly created
      let meDocument = Object.assign({}, state)
      if (!meDocument.settings) {
        meDocument.settings = {}
      } else {
        meDocument.settings = Object.assign({}, state.settings)
      }
      meDocument.settings.scale = action.scale
      state = meDocument
      break
    }
  }

  return state
}

// let ensureDefaultSettings = function (settings) {
//   // null values are not considered by _.defaults
//   let settingsWithoutNull = _.mapObject(settings, function (val, key) {
//     if (val == null) {
//       return undefined
//     } else {
//       return val
//     }
//   })

//   return _.defaults(settingsWithoutNull, { scale: '1' })
// }

function forceUpdateDocument (state, document) {
  let existingItemIndex = state.findIndex(item => item._id === document._id)
  if (existingItemIndex !== -1) {
    state[existingItemIndex] = document
  } else {
    state.push(document)
  }
}

function updateDocument (state, document) {
  let existingItemIndex = state.findIndex(item => item._id === document._id)

  if (existingItemIndex !== -1) {
    // Updating existing item
    const existingItem = state[existingItemIndex]
    if (
      document.hasOwnProperty('_rev') &&
      existingItem.hasOwnProperty('_rev')
    ) {
      if (document._rev >= existingItem._rev) {
        // We're getting a newer version from the database than we have locally.
        // So we can update our local store.
        state[existingItemIndex] = document
      } else {
        // We're getting an older revision than we have already stored.
        // We won't update the store with that.
      }
    } else {
      // This is a new object that doesn't have a _rev yet.
      state[existingItemIndex] = document
    }
  } else {
    // New item
    state.push(document)
  }
}

/** Filter all documents where the _id and the _rev matches */
function filterByDeletedDocuments (array, deletedDocuments) {
  if (!deletedDocuments.length) return array
  return array.filter(
    doc =>
      !deletedDocuments.includes(
        deletedDoc => deletedDoc._id === doc._id && deletedDoc._rev === doc._rev
      )
  )
}
