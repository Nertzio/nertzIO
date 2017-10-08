

/**
 * ACTION TYPES
 */
const ADD_PLAYER = 'ADD_PLAYER'
const CLEAR_PLAYERS = 'CLEAR_PLAYERS';

/**
 * INITIAL STATE
 */
const DEFAULT_PLAYERS = {}

/**
 * ACTION CREATORS
 */
export const updatePlayerByKey = (playerKey, userInfo) => {
  let user = {};
  // user['player_' + playerKey] = userInfo;
  user[playerKey] = userInfo;
  return ({type: ADD_PLAYER, user})
}

export const clearPlayers = () => ({
  type: CLEAR_PLAYERS
})

/**
 * REDUCER
 */
export default function playersReducer (state = DEFAULT_PLAYERS, action) {
  switch (action.type) {
    case ADD_PLAYER:
      return {...state, ...action.user};
    case CLEAR_PLAYERS:
      return DEFAULT_PLAYERS;
    default:
      return state
  }
}
