import { SCREEN_SHARE_ITEM_SET_CONTACTS } from '../constants'

export function screen_shareItem_contacts (state = [], action) {
  switch (action.type) {
    case SCREEN_SHARE_ITEM_SET_CONTACTS:
      return action.shareItemContacts
    default:
      return state
  }
}
