import { combineReducers } from 'redux'
import { DELETE_ALL_DATA, CLEAR_STORE } from '../constants'
import items from './items'
import lists from './lists'
import contacts from './contacts'
import me from './me'
import authweb from './authweb'

import {
  screen_listDetails_filterCriteria,
  screen_listDetails_itemFilterMode,
  screen_listDetails_itemSelectionMode,
  screen_listDetails_itemSortMode,
  screen_listDetails_selectedItems,
  screen_listDetails_itemSortingManner
} from './screenListDetailsReducer'
import {
  screen_collectionsOverview_listSortingManner,
  screen_collectionsOverview_listSortMode
} from './screenListOverviewReducer'
import { screen_shareItem_contacts } from './screenShareItemContactsReducer'

const appReducer = combineReducers({
  lists,
  items,
  contacts,
  me,
  // authweb,
  screen_listDetails_itemSelectionMode,
  screen_listDetails_selectedItems,
  screen_listDetails_itemFilterMode,
  screen_listDetails_filterCriteria,
  screen_listDetails_itemSortingManner,
  screen_listDetails_itemSortMode,
  screen_collectionsOverview_listSortMode,
  screen_collectionsOverview_listSortingManner,
  screen_shareItem_contacts
})

export default function rootReducer (state, action) {
  // These actions are called when logging out or deleting the user
  // and reinitialize the store
  if (action.type === DELETE_ALL_DATA || action.type === CLEAR_STORE) {
    state = undefined
  }
  return appReducer(state, action)
}
