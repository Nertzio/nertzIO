/**
    MAY NOT NEED THIS FILE--
    created in order to store players for pending games,
    but idea not fleshed out.
    If no longer need,
    remember to delete references in index.js sibling
 */


/**
 * ACTION TYPES
 */
const ADD_PLAYER = 'ADD_PLAYER'

/**
 * INITIAL STATE
 */
const defaultPlayers = []

/**
 * ACTION CREATORS
 */
export const addPlayer = user => ({type: ADD_PLAYER, user})

/**
 * REDUCER
 */
export default function pendingPlayersReducer (state = defaultPlayers, action) {
  switch (action.type) {
    case ADD_PLAYER:
      return [...state, action.user]
    default:
      return state
  }
}
