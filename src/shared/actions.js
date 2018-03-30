/*
 * action types
 */
import {
  UPDATE_DOCUMENTS_FROM_DATABASE,
  ADD_DEVICE_TOKEN,
  UPDATE_ITEM,
  DELETE_ITEMS,
  UPDATE_LIST,
  UPDATE_CONTACT,
  DELETE_CONTACT,
  UPDATE_SETTINGS,
  UPDATE_SCALE,
  DELETE_LIST,
  DELETE_ALL_DATA,
  CLEAR_STORE,
  SCREEN_SET_SELECTED_ITEMS,
  SCREEN_ADD_SELECTED_ITEM,
  SCREEN_REMOVE_SELECTED_ITEM,
  SCREEN_SET_ITEM_SELECTION_MODE,
  SCREEN_SET_ITEM_FILTER_MODE,
  SCREEN_SET_ITEM_FILTER_CRITERIA,
  SCREEN_LISTDETAILS_SET_ITEM_SORTING_MANNER,
  SCREEN_LISTDETAILS_SET_ITEM_SORT_MODE,
  SCREEN_COLLECTIONSOVERVIEW_SET_LIST_SORTING_MANNER,
  SCREEN_COLLECTIONSOVERVIEW_SET_LIST_SORT_MODE,
  SCREEN_SHARE_ITEM_SET_CONTACTS
} from './constants'

/*
 * action creators
 */

export function updateDocumentsFromDatabase (
  updatedDocuments,
  deletedDocuments
) {
  return {
    type: UPDATE_DOCUMENTS_FROM_DATABASE,
    updatedDocuments,
    deletedDocuments
  }
}

export function updateList (list) {
  return {
    type: UPDATE_LIST,
    text: 'save list',
    list: list
  }
}

export function deleteList (listID) {
  return {
    type: DELETE_LIST,
    text: 'delete list',
    listID: listID
  }
}

export function updateItem (item) {
  return {
    type: UPDATE_ITEM,
    item
  }
}

export function deleteItems (itemIDs) {
  return {
    type: DELETE_ITEMS,
    itemIDs
  }
}

export function updateContact (contact) {
  return {
    type: UPDATE_CONTACT,
    contact
  }
}

export function setSettingScale (scale) {
  return {
    type: UPDATE_SCALE,
    scale
  }
}

export function updateSettings (settings) {
  return {
    type: UPDATE_SETTINGS,
    settings
  }
}

export function deleteContact (contactID) {
  return {
    type: DELETE_CONTACT,
    text: 'delete contact',
    contactID: contactID
  }
}

export function deleteAllData () {
  return {
    type: DELETE_ALL_DATA,
    text: 'delete all data'
  }
}

export function clearStore () {
  return { type: CLEAR_STORE }
}

export function addDeviceToken (deviceToken) {
  return {
    type: ADD_DEVICE_TOKEN,
    deviceToken
  }
}

export function setSelectedItems (selectedItems) {
  return {
    type: SCREEN_SET_SELECTED_ITEMS,
    selectedItems
  }
}

export function addSelectedItem (selectedItem) {
  return {
    type: SCREEN_ADD_SELECTED_ITEM,
    selectedItem
  }
}

export function removeSelectedItem (selectedItem) {
  return {
    type: SCREEN_REMOVE_SELECTED_ITEM,
    selectedItem
  }
}

export function setItemSelectionMode (isItemSelectionMode) {
  return {
    type: SCREEN_SET_ITEM_SELECTION_MODE,
    isItemSelectionMode
  }
}

export function setItemFilterMode (isItemFilterMode) {
  return {
    type: SCREEN_SET_ITEM_FILTER_MODE,
    isItemFilterMode
  }
}

export function setItemsFilterCriterias (filterCriteria) {
  return {
    type: SCREEN_SET_ITEM_FILTER_CRITERIA,
    filterCriteria
  }
}

export function setScreenListDetails_ItemSortMode (isItemSortMode) {
  return {
    type: SCREEN_LISTDETAILS_SET_ITEM_SORT_MODE,
    isItemSortMode
  }
}

export function setScreenListDetails_ItemSortingManner (property, direction) {
  return {
    type: SCREEN_LISTDETAILS_SET_ITEM_SORTING_MANNER,
    property,
    // either ascending or descending
    direction
  }
}

export function setScreenCollectionsOverview_ListSortMode (isListSortMode) {
  return {
    type: SCREEN_COLLECTIONSOVERVIEW_SET_LIST_SORT_MODE,
    isListSortMode
  }
}

export function setScreenCollectionsOverview_ListSortingManner (
  property,
  direction
) {
  return {
    type: SCREEN_COLLECTIONSOVERVIEW_SET_LIST_SORTING_MANNER,
    property,
    // either ascending or descending
    direction
  }
}

export function setShareItemContacts (shareItemContacts) {
  return {
    type: SCREEN_SHARE_ITEM_SET_CONTACTS,
    shareItemContacts
  }
}
