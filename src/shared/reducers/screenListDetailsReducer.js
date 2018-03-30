import {
  SCREEN_ADD_SELECTED_ITEM,
  SCREEN_REMOVE_SELECTED_ITEM,
  SCREEN_SET_ITEM_FILTER_CRITERIA,
  SCREEN_SET_ITEM_FILTER_MODE,
  SCREEN_LISTDETAILS_SET_ITEM_SORTING_MANNER,
  SCREEN_SET_ITEM_SELECTION_MODE,
  SCREEN_LISTDETAILS_SET_ITEM_SORT_MODE,
  SCREEN_SET_SELECTED_ITEMS
} from '../constants'

export function screen_listDetails_itemSelectionMode (state = false, action) {
  switch (action.type) {
    case SCREEN_SET_ITEM_SELECTION_MODE:
      state = action.isItemSelectionMode
      break
  }
  return state
}

export function screen_listDetails_itemFilterMode (state = false, action) {
  switch (action.type) {
    case SCREEN_SET_ITEM_FILTER_MODE:
      state = action.isItemFilterMode
      break
  }
  return state
}

export function screen_listDetails_filterCriteria (state = [], action) {
  switch (action.type) {
    case SCREEN_SET_ITEM_FILTER_CRITERIA:
      state = action.filterCriteria
      break
  }
  return state
}

export function screen_listDetails_selectedItems (state = [], action) {
  switch (action.type) {
    case SCREEN_SET_SELECTED_ITEMS:
      // console.log("set selected item" + JSON.stringify(action.selectedItems));
      state = action.selectedItems.slice()
      break
    case SCREEN_ADD_SELECTED_ITEM:
      // console.log("adding selected item" + JSON.stringify(action.selectedItems));
      state = state.slice()
      state.push(action.selectedItem)
      break
    case SCREEN_REMOVE_SELECTED_ITEM:
      // console.log("remove selected items" + JSON.stringify(action.selectedItems));
      state = state.filter(function (item) {
        return item._id != action.selectedItem._id
      })
      break
  }
  return state
}

export function screen_listDetails_itemSortMode (state = false, action) {
  switch (action.type) {
    case SCREEN_LISTDETAILS_SET_ITEM_SORT_MODE:
      state = action.isItemSortMode
      break
  }
  return state
}

export function screen_listDetails_itemSortingManner (state = {}, action) {
  switch (action.type) {
    case SCREEN_LISTDETAILS_SET_ITEM_SORTING_MANNER:
      state = { property: action.property, direction: action.direction }
      // console.log('new sorting manner: ' + JSON.stringify(state));
      break
  }
  return state
}
