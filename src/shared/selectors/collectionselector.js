import { createSelector } from 'reselect'

const collectionsToListsMap = state => {
  // let's get a map of all the collections we have in our lists
  let collections = {}
  state.lists.map((list, index) => {
    let collection = collections[list.collection] || {
      name: list.collection,
      key: index,
      lists: []
    }
    collection.lists.push(list)
    collections[list.collection] = collection
  })
  return collections
}

const collections = state => {
  let collections = []
  state.lists.map(list => {
    if (
      collections.indexOf(list.collection) == -1 &&
      list.collection != undefined
    ) {
      collections.push(list.collection)
    }
  })

  return collections
}

// creating Memoized Selector
export const getCollectionsToListsMap = createSelector(
  [collectionsToListsMap],
  collectionsToListsMap => {
    return collectionsToListsMap
  }
)

// creating Memoized Selector
export const getCollections = createSelector([collections], collections => {
  return collections
})

/** Collections that the user can edit */
export const getEditableCollections = createSelector([], () => {
  return ['My Collection', 'Wishlists']
})
