import * as _ from 'underscore'
import { createSelector } from 'reselect'
import { getItemsFilteredByIds } from './itemselector'

// expect filterCriteria in format: [ {property: "artist", value: "the artist name", method: "equals"}, ...]
const listItemsByFilterCriteria = function (state, listID, filterCriteria) {
  let list = state.lists.find(item => listID == item._id)
  let listItems = getItemsFilteredByIds(state, list.items)
  let filteredItems = listItems.filter(item =>
    itemMeetsFilterCriteria(item, filterCriteria)
  )
  return filteredItems
}

// AND filter between sections
const itemMeetsFilterCriteria = function (item, filterCriteria) {
  // group filter criteria by property (section): artist, year, medium..
  let criteriaGroupedByProperty = _.groupBy(
    filterCriteria,
    criteriaItem => criteriaItem.property
  )
  // console.log("criteriaGroupedByProperty: " + JSON.stringify(criteriaGroupedByProperty));
  let itemMeetsCriteria = true
  Object.keys(criteriaGroupedByProperty).forEach(function (key, index) {
    itemMeetsCriteria =
      itemMeetsCriteria &&
      itemMeetsInnerSectionFilterCriteria(
        item,
        key,
        criteriaGroupedByProperty[key].map(criteriaItem => criteriaItem)
      )
  })
  return itemMeetsCriteria
}

// OR filter within a section
const itemMeetsInnerSectionFilterCriteria = function (
  item,
  property,
  relatedCriteriaValues
) {
  if (property != 'All') {
    let allowedValues = relatedCriteriaValues.map(
      criteriaValue => criteriaValue.value
    )
    return allowedValues.includes(item[property])
  } else {
    let searchString = relatedCriteriaValues[0].value
    return Object.keys(item).some(property => {
      // console.log("is string of " + property + ", " + _.isString(property));
      return _.isString(item[property])
        ? item[property]
            .toLocaleLowerCase()
            .indexOf(searchString.toLocaleLowerCase()) != -1
        : false
    })
  }
}

// creating Memoized Selector
export const getListItemsByFilterCriteria = createSelector(
  [listItemsByFilterCriteria],
  listItemIdsByFilterCriteria => {
    return listItemIdsByFilterCriteria
  }
)
