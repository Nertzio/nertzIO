

/**
 * ACTION TYPES
 */
const ADD_PLAYER = 'ADD_PLAYER'

/**
 * INITIAL STATE
 */
const defaultPlayers = {}

/**
 * ACTION CREATORS
 */
export const updatePlayerByKey = (playerKey, userInfo) => {
  let user = {};
  // user['player_' + playerKey] = userInfo;
  user[playerKey] = userInfo;
  return ({type: ADD_PLAYER, user})
}

/**
 * REDUCER
 */
export default function playersReducer (state = defaultPlayers, action) {
  switch (action.type) {
    case ADD_PLAYER:
      return {...state, ...action.user}
    default:
      return state
  }
}
