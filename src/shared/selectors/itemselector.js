import { createSelector } from 'reselect'
import { documentById } from './documentselector'
import DeviceInfo from 'react-native-device-info'

const availableImagesForCurrentDevice = function (state, itemID) {
  let item = documentById(state, 'items', itemID)
  return (
    (item.images &&
      item.images.filter(
        image =>
          image.imageReferenceId ||
          image.temporaryLocalReference.deviceID == DeviceInfo.getUniqueID()
      )) || []
  )
}

const nonAvailableImagesForCurrentDevice = function (state, itemID) {
  let item = documentById(state, 'items', itemID)
  return (
    (item.images &&
      item.images.filter(
        image =>
          image.temporaryLocalReference &&
          image.temporaryLocalReference.deviceID != DeviceInfo.getUniqueID()
      )) || []
  )
}

export const getAvailableImagesForCurrentDevice = createSelector(
  [availableImagesForCurrentDevice],
  availableImagesForCurrentDevice => {
    return availableImagesForCurrentDevice
  }
)

// creating Memoized Selector
export const getNonAvailableImages = createSelector(
  [nonAvailableImagesForCurrentDevice],
  nonAvailableImagesForCurrentDevice => {
    return nonAvailableImagesForCurrentDevice
  }
)
