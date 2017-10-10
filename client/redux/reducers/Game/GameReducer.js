
const DEFAULT_GAME = {
  // playerCanCallNertz
  isRoundOver: false,
  // isGameOver: false,
  // playingTo: 0,
  whoCalledNertz: '',
};
const GAME_START = 'GAME_START';
const GAME_OVER = 'GAME_OVER';
const ROUND_OVER = 'ROUND_OVER';
const ROUND_START = 'ROUND_START';
const SET_SCORE_LIMIT = 'SET_SCORE_LIMIT';

export const setGameOver = () => ({
  type: GAME_OVER,
});

export const startNewGame = () => ({
  type: GAME_START,
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


const gauser = (game = DEFAULT_GAME, action) => {
  const {type, limit} = action;
  switch (type) {
    case GAME_START:
      return {...game, isGameOver: false};
    case GAME_OVER:
      return {...game, isGameOver: true};
    case ROUND_START:
      return {...game, isRoundOver: false};
    case ROUND_OVER:
        return {...game, isRoundOver: true};
    case SET_SCORE_LIMIT:
      return {...game, scoreLimit: limit}
    default:
      return game;
  }
}

export default gauser;
