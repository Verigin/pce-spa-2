import { createSelector } from 'reselect'
import { documentById } from './documentselector'

const itemById = function (state, props) {
  return documentById(state, 'items', props.itemID)
}

const filterByIds = function (state, itemIDs) {
  return state.items.filter(item => itemIDs.includes(item._id))
}

export const getAllItems = state => state.items

export const getMeActive = state => state.me.active

// creating Memoized Selector
export const getItemsFilteredByIds = createSelector(
  [filterByIds],
  filterByIds => {
    return filterByIds
  }
)

// creating Memoized Selector
export const getItemById = createSelector([itemById], itemById => {
  return itemById
})
