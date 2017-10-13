import {
  findCurrentUserInPlayers,
  getUserPlayerNum,
} from '../vanillaUtils';
import store, {
  setNertzHasBeenCalled,
  setPlayerNumWhoCalledNertz,
  clearPlayers,
  setGameRef,
  setStackRef,
  setGameInProgress,
  setGameNotInProgress,
  setGameToPaused,
  setGameToUnpaused,
  // userActionTaken,
  // requireUserAction,
  // setGameOver,
  startNewGame,
  // setRoundOver,
  // startNewRound,
  // setScoreLimit,
  setUserPlayerNum,
  startLoading,
  stopLoading,
  updatePlayerByKey, // need to create this action creator
  updatePlayerStackByKey,
  updateFieldStackByKey,
  updatePlayerScoreByKey,
  updatePlayerListeningStatusByKey,
} from '../redux';
const {dispatch} = store;

export const clearPlayersInStore = () => {
  return dispatch(clearPlayers());
}

export const countCardsInUserLittleStackInRedux = () => {
  const {user, players} = store.getState();
  const currentUserPlayer = findCurrentUserInPlayers(user, players);
  const playerNum = getUserPlayerNum(user, players);
  const littleStack = currentUserPlayer.stacks[`p${playerNum}LittleStack`];
  return littleStack.length === 0;
}

export const gameIsOverInRedux = () => {
  return store.getState().game.isGameOver;
}

// Replaced this functionality with combination of callNertz button and firebase/redux utils for isNertzCalled

// export const roundIsOverInRedux = () => {
//   return store.getState().game.isRoundOver;
// }

export const playerNumWhoCalledNertzInRedux = () => {
  return store.getState().game.playerNumWhoCalledNertz;
}

export const getCurrentUserInRedux = () => {
  return store.getState().user;
}

export const getFirebaseGameRefFromRedux = () => {
  return store.getState().firebaseRefs.game
}

export const getReduxGameRef = () => {
  return store.getState().firebaseRefs.game
}

export const getGameRefInRedux = () => {
  return store.getState().firebaseRefs.game
}

export const getPlayersInStore = () => {
  return store.getState().players;
}

export const getStackInStoreByKey = (stackKey) => {
  return store.getState()[stackKey]
}

// export const setGameOverInRedux = () => {
//   return dispatch(setGameOver());
// }

export const setReduxGameProgressStatus = isInProgress => {
  if (isInProgress) return dispatch(setGameInProgress());
  else return dispatch(setGameNotInProgress());
}

// export const setReduxGamePauseStatus = isGamePaused => {
//   if (isGamePaused) return dispatch(setGameToPaused());
//   else return dispatch(setGameToUnpaused());
// }

export const setUserPlayerNumInRedux = (num) => {
  return dispatch(setUserPlayerNum(num));
}

export const setPlayerNumWhoCalledNertzInRedux = (playerNumWhoCalledNertz) => {
  return dispatch(setPlayerNumWhoCalledNertz(playerNumWhoCalledNertz));
}

export const setNertzHasBeenCalledInRedux = (isNertzCalled) => {
  return dispatch(setNertzHasBeenCalled(isNertzCalled));
}

export const startNewGameInRedux = () => {
  return dispatch(startNewGame());
}

// export const setRoundOverInRedux = () => {
//   return dispatch(setRoundOver());
// }

// export const startNewRoundInRedux = () => {
//   return dispatch(startNewRound());
// }

// export const setScoreLimitInRedux = (limit) => {
//   return dispatch(setScoreLimit(limit));
// }

export const setGameRefInRedux = gameRef => {
  dispatch(setGameRef(gameRef));
}

export const storeStackRefInReduxByKey = (stackKey, stackRef) => {
  return dispatch(setStackRef({[stackKey]: stackRef}))
}

// export const tellReduxModalIsClosed = () => {
//   return dispatch(userActionTaken());
// }

// export const tellReduxModalIsOpen = () => {
//   return dispatch(requireUserAction());
// }

export const tellReduxImLoading = () => {
  return dispatch(startLoading());
}

export const tellReduxImDoneLoading = () => {
  return dispatch(stopLoading());
}

export const updatePlayerInReduxByKey = (playerKey, updatedPlayer) => {
  return dispatch(updatePlayerByKey(playerKey, updatedPlayer));
}

export const updatePlayerScoreInReduxByKey = (key, score) => {
  return dispatch(updatePlayerScoreByKey(key, score));
}

export const updatePlayerListeningStatusInReduxByKey = (key, status) => {
  return dispatch(updatePlayerListeningStatusByKey(key, status));
}

export const updateReduxPlayerStackByKey = (stackKey, newState) => {
  dispatch(updatePlayerStackByKey(stackKey, newState));
}

export const updateReduxFieldStackByKey = (stackKey, newState) => {
  const action = updateFieldStackByKey(stackKey, newState)
  return dispatch(action);
}
