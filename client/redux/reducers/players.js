/**
  fill in this store according to what players are already in the firebase game instance and add event listener in addNewPlayerToGame() to update this store when new players are added
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
export default function playersReducer (state = defaultPlayers, action) {
  switch (action.type) {
    case ADD_PLAYER:
      return [...state, action.user]
    default:
      return state
  }
}
