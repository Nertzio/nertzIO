
const DEFAULT_GAME = {
  isInProgress: false,
  // playerCanCallNertz
  isRoundOver: false,
  // isGameOver: false,
  // playingTo: 0,
  whoCalledNertz: '',
  userPlayerNum: false,
};
const GAME_START = 'GAME_START';
const GAME_OVER = 'GAME_OVER';
const GAME_IN_PROGRESS = 'GAME_IN_PROGRESS';
const GAME_NOT_IN_PROGRESS = 'GAME_NOT_IN_PROGRESS';
const ROUND_OVER = 'ROUND_OVER';
const ROUND_START = 'ROUND_START';
const SET_SCORE_LIMIT = 'SET_SCORE_LIMIT';
const SET_USER_PLAYER_NUM = 'SET_USER_PLAYER_NUM';

export const setGameOver = () => ({
  type: GAME_OVER,
});

export const startNewGame = () => ({
  type: GAME_START,
})

export const setGameInProgress = () => ({
  type: GAME_IN_PROGRESS,
})

export const setGameNotInProgress = () => ({
  type: GAME_NOT_IN_PROGRESS,
})

export const setRoundOver = () => ({
  type: ROUND_OVER,
});

export const startNewRound = () => ({
  type: ROUND_START,
});

export const setScoreLimit = limit => ({
  type: SET_SCORE_LIMIT,
  limit,
})

export const setUserPlayerNum = userPlayerNum => ({
  type: SET_USER_PLAYER_NUM,
  userPlayerNum
})


const gameReducer = (game = DEFAULT_GAME, action) => {
  const {type, limit, userPlayerNum} = action;
  switch (type) {
    case GAME_START:
      return {...game, isGameOver: false};
    case GAME_OVER:
      return {...game, isGameOver: true};
    case GAME_IN_PROGRESS:
      return {...game, isInProgress: true}
    case GAME_NOT_IN_PROGRESS:
      return {...game, isInProgress: false};
    case ROUND_START:
      return {...game, isRoundOver: false};
    case ROUND_OVER:
        return {...game, isRoundOver: true};
    case SET_SCORE_LIMIT:
      return {...game, scoreLimit: limit}
    case SET_USER_PLAYER_NUM:
      return {...game, userPlayerNum};
    default:
      return game;
  }
}

export default gameReducer;
