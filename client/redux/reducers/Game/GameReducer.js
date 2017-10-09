const DEFAULT_GAME = {
  isInProgress: false,
};

const GAME_IN_PROGRESS = 'GAME_IN_PROGRESS';
const GAME_NOT_IN_PROGRESS = 'GAME_NOT_IN_PROGRESS';


export const setReduxGameInProgress = () => ({
  type: GAME_IN_PROGRESS,
})

export const setReduxGameNotInProgress = () => ({
  type: GAME_NOT_IN_PROGRESS,
})


const gameReducer = (game = DEFAULT_GAME, action) => {
  const {type, isInProgress} = action;
  switch (type) {
    case GAME_IN_PROGRESS:
      return {...game, isInProgress: true}
    case GAME_NOT_IN_PROGRESS:
      return {...game, isInProgress: false};
    default:
      return game;
  }
}

export default gameReducer;
