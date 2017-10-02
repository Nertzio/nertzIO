const GAME = {};

const SET_GAME_REF = 'SET_GAME_REF';

export const setGameRef = (gameRef) => ({
  type: SET_GAME_REF,
  gameRef
})

const gameReducer = (game = GAME, action) => {
  const {type, gameRef} = action;
  switch (type) {
    case SET_GAME_REF:
      return {...game, gameRef};
    default:
      return game;
  }
}

export default gameReducer;
