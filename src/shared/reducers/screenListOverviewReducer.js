import {
  SCREEN_COLLECTIONSOVERVIEW_SET_LIST_SORT_MODE,
  SCREEN_COLLECTIONSOVERVIEW_SET_LIST_SORTING_MANNER
} from '../constants'

export function screen_collectionsOverview_listSortMode (state = false, action) {
  switch (action.type) {
    case SCREEN_COLLECTIONSOVERVIEW_SET_LIST_SORT_MODE:
      state = action.isListSortMode
      break
  }
  return state
}

export function screen_collectionsOverview_listSortingManner (
  state = { property: 'Alphabet', direction: 'asc' },
  action
) {
  switch (action.type) {
    case SCREEN_COLLECTIONSOVERVIEW_SET_LIST_SORTING_MANNER:
      state = { property: action.property, direction: action.direction }
      // console.log('new sorting manner: ' + JSON.stringify(state));
      break
  }
  return state
}
