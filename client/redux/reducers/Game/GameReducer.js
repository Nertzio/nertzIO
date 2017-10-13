
const DEFAULT_GAME = {
  isInProgress: false,
  isGamePaused: false,
  // isGameOver: false,
  // playingTo: 0,
  playerNumWhoCalledNertz: false, // initialized to false to avoid potential complications with player associations
  userPlayerNum: false,
  isNertzCalled: false,
};
// const GAME_START = 'GAME_START';
// const GAME_OVER = 'GAME_OVER';
// const ROUND_OVER = 'ROUND_OVER';
// const ROUND_START = 'ROUND_START';
const GAME_IN_PROGRESS = 'GAME_IN_PROGRESS';
const GAME_NOT_IN_PROGRESS = 'GAME_NOT_IN_PROGRESS';
const GAME_PAUSED = 'GAME_PAUSED';
const GAME_UNPAUSED = 'GAME_UNPAUSED';
const SET_SCORE_LIMIT = 'SET_SCORE_LIMIT';
const SET_USER_PLAYER_NUM = 'SET_USER_PLAYER_NUM';
const SET_PLAYER_NUM_WHO_CALLED_NERTZ = 'SET_PLAYER_NUM_WHO_CALLED_NERTZ';
const SET_NERTZ_HAS_BEEN_CALLED = 'SET_NERTZ_HAS_BEEN_CALLED';

// export const setGameOver = () => ({
//   type: GAME_OVER,
// });

// export const startNewGame = () => ({
//   type: GAME_START,
// })


// export const setRoundOver = () => ({
//   type: ROUND_OVER,
// });

export const setGameInProgress = () => ({
  type: GAME_IN_PROGRESS,
})

export const setGameNotInProgress = () => ({
  type: GAME_NOT_IN_PROGRESS,
})

export const setGameToPaused = () => ({
  type: GAME_PAUSED,
})

export const setGameToUnpaused = () => ({
  type: GAME_UNPAUSED,
})

// export const startNewRound = () => ({
//   type: ROUND_START,
// });

export const setScoreLimit = limit => ({
  type: SET_SCORE_LIMIT,
  limit,
})

export const setUserPlayerNum = userPlayerNum => ({
  type: SET_USER_PLAYER_NUM,
  userPlayerNum
})

export const setPlayerNumWhoCalledNertz = playerNumWhoCalledNertz => ({
  type: SET_PLAYER_NUM_WHO_CALLED_NERTZ,
  playerNumWhoCalledNertz
})

export const setNertzHasBeenCalled = (isNertzCalled) => ({
  type: SET_NERTZ_HAS_BEEN_CALLED,
  isNertzCalled
})

const gameReducer = (game = DEFAULT_GAME, action) => {
  const {type, limit, userPlayerNum, isNertzCalled, playerNumWhoCalledNertz} = action;
  switch (type) {
    // case GAME_START:
    //   return {...game, isGameOver: false};
    // case GAME_OVER:
    //   return {...game, isGameOver: true};
    // case ROUND_START:
    //   return {...game, isRoundOver: false};
    // case ROUND_OVER:
    //     return {...game, isRoundOver: true};
    case GAME_IN_PROGRESS:
      return {...game, isInProgress: true}
    case GAME_NOT_IN_PROGRESS:
      return {...game, isInProgress: false};
    case GAME_PAUSED:
      return {...game, isGamePaused: true}
    case GAME_UNPAUSED:
      return {...game, isGamePaused: false};
    case SET_SCORE_LIMIT:
      return {...game, scoreLimit: limit}
    case SET_USER_PLAYER_NUM:
      return {...game, userPlayerNum};
    case SET_PLAYER_NUM_WHO_CALLED_NERTZ:
      return {...game, playerNumWhoCalledNertz};
    case SET_NERTZ_HAS_BEEN_CALLED:
      return {...game, isNertzCalled};
    default:
      return game;
  }
}

export default gameReducer;
