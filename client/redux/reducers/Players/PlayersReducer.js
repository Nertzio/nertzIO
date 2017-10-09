

/**
 * ACTION TYPES
 */
const UPDATE_PLAYER = 'UPDATE_PLAYER'
const UPDATE_LISTENING_STATUS = 'UPDATE_LISTENING_STATUS';
const UPDATE_SCORE = 'UPDATE_SCORE';
const CLEAR_PLAYERS = 'CLEAR_PLAYERS';

/**
 * INITIAL STATE
 */
const DEFAULT_PLAYERS = {}

/**
 * ACTION CREATORS
 */
export const updatePlayerByKey = (playerKey, playerInfo) => {
  let player = {};

  player[playerKey] = playerInfo;
  return ({type: UPDATE_PLAYER, player})
}

export const updatePlayerScoreByKey = (playerKey, score) => ({
  type: UPDATE_SCORE,
  key: playerKey,
  score: score || 0,
})

export const updatePlayerListeningStatusByKey = (playerKey, status) => ({
  type: UPDATE_LISTENING_STATUS,
  key: playerKey,
  isListeningForUpdates: status || false,
})

export const clearPlayers = () => ({
  type: CLEAR_PLAYERS
})

/**
 * REDUCER
 */
export default function playersReducer (players = DEFAULT_PLAYERS, action) {
  const { type, player, key, isListeningForUpdates, score } = action;
  switch (type) {
    case UPDATE_PLAYER:
      return {...players, ...player};
    case UPDATE_LISTENING_STATUS:
      let updatedPlayer = {[key]: {...players[key], isListeningForUpdates}}
      return {...players, ...updatedPlayer};
    case UPDATE_SCORE:
      updatedPlayer = {[key]: {...players[key], score}};
      return {...players, ...updatedPlayer};
    case CLEAR_PLAYERS:
      return DEFAULT_PLAYERS;
    default:
      return players
  }
}
