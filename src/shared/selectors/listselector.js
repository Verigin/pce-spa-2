import { createSelector } from 'reselect'
import { documentById } from './documentselector'

const listById = function (state, listID) {
  return documentById(state, 'lists', listID)
}

// creating Memoized Selector
export const getListById = createSelector([listById], listById => {
  return listById
})

const itemReferencingLists = function (state, itemID) {
  // console.log("in selector: " + itemID);
  return state.lists.filter(list => list.items.some(itemId => itemId == itemID))
}

const itemNonReferencingLists = function (state, itemID) {
  // console.log("in selector: " + itemID);
  return state.lists.filter(list => list.items.indexOf(itemID) == -1)
}

const unionOfItemsNonReferencingLists = function (state, itemIDs) {
  let unionOfItemsNonRefLists = []
  let arrayOfNonReferencingListsWithDuplicates = itemIDs.map(function (itemID) {
    return itemNonReferencingLists(state, itemID)
  })
  arrayOfNonReferencingListsWithDuplicates.forEach(nonReferencingLists => {
    nonReferencingLists.forEach(singleList => {
      if (
        unionOfItemsNonRefLists.findIndex(list => {
          return singleList._id == list._id
        }) == -1
      ) {
        unionOfItemsNonRefLists.push(singleList)
      }
    })
  })
  // console.log("arrayOfNonReferencingListsWithDuplicates: " + JSON.stringify(unionOfItemsNonRefLists));
  return unionOfItemsNonRefLists
}

// creating Memoized Selector
export const getItemReferencingLists = createSelector(
  [itemReferencingLists],
  itemReferencingLists => {
    return itemReferencingLists
  }
)

// creating Memoized Selector
export const getItemNonReferencingLists = createSelector(
  [itemNonReferencingLists],
  itemNonReferencingLists => {
    return itemNonReferencingLists
  }
)

export const getUnionOfItemsNonReferencingLists = createSelector(
  [unionOfItemsNonReferencingLists],
  unionOfItemsNonReferencingLists => {
    return unionOfItemsNonReferencingLists
  }
)

const findUnassignedItems = function (state) {
  const allLists = state.lists
  return state.items.filter(item => {
    const itemID = item._id
    return !allLists.some(list => list.items.indexOf(itemID) >= 0)
  })
}

/** Returns an array of all items that do not have a list */
export const getUnassignedItems = createSelector(
  [findUnassignedItems],
  unassignedItems => unassignedItems
)
