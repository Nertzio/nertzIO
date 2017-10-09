import {
  checkIfUserIsAmongPlayers,
  getUserPlayerNum
} from '../vanillaUtils';

import store, {
  clearPlayers,
  setCurrentUser,
  setFirebaseAppRef,
  setGameRef,
  setReduxGameInProgress,
  setReduxGameNotInProgress,
  setStackRef,
  setToLoading,
  setToNotLoading,
  updatePlayerByKey,
  updatePlayerStackByKey,
  updateFieldStackByKey,
  updatePlayerScoreByKey,
  updatePlayerListeningStatusByKey,
} from '../redux';
const {dispatch} = store;

export const checkForUserInReduxPlayers = () => {
  return checkIfUserIsAmongPlayers(store.getState().players);
}

export const clearPlayersInStore = () => {
  return dispatch(clearPlayers());
}

export const getCurrentUserInRedux = () => {
  return store.getState().user;
}

export const getCurrentUserAsPlayerInRedux = () => {
  const {user, players} = store.getState();
  return players[getUserPlayerNum(user, players)];
}

export const getReduxGameRef = () => {
  return store.getState().firebaseRefs.game
}

export const getPlayersInRedux = () => {
  return store.getState().players;
}

export const getStackInStoreByKey = (stackKey) => {
  return store.getState()[stackKey]
}

export const setGameRefInRedux = gameRef => {
  // avoid unnecessary rerenders if same game:
  if (gameRef.key === getReduxGameRef.key) return;
  else return dispatch(setGameRef(gameRef));
}

export const setReduxGameProgressStatus = isInProgress => {
  if (isInProgress) return dispatch(setReduxGameInProgress());
  else return dispatch(setReduxGameNotInProgress());
}

export const setCurrentUserInRedux = (currentUser) => {
  return dispatch(setCurrentUser(currentUser));
}

export const storeFirebaseAppInRedux = (firebaseApp) => {
  return dispatch(setFirebaseAppRef(firebaseApp));
}

export const storeStackRefInReduxByKey = (stackKey, stackRef) => {
  return dispatch(setStackRef({[stackKey]: stackRef}))
}

export const tellReduxImLoading = () => {
  return dispatch(setToLoading());
}

export const tellReduxImDoneLoading = () => {
  return dispatch(setToNotLoading());
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
