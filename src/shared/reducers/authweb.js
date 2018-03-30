import { AUTH_SUCCES } from '../constants'

export default function authweb (state = [], action) {
  switch (action.type) {
    case AUTH_SUCCES: {
      state = state.slice()
      // add auth to store
      // state.me.push({ auth: 'true' })
      break
    }
  }

  return state
}
