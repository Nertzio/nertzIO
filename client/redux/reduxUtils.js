import store, {
  clearPlayers,
  setCurrentUser,
  setFirebaseAppRef,
  setGameRef,
  setStackRef,
  setToLoading,
  setToNotLoading,
  updatePlayerByKey, // need to create this action creator
  updatePlayerStackByKey,
  updateFieldStackByKey,
} from '../redux';
const {dispatch} = store;

export const clearPlayersInStore = () => {
  return dispatch(clearPlayers());
}

export const getCurrentUserInRedux = () => {
  return store.getState().user;
}

export const getFirebaseGameRefFromRedux = () => {
  return store.getState().firebaseRefs.game
}

export const getPlayersInStore = () => {
  return store.getState().players;
}

export const getStackInStoreByKey = (stackKey) => {
  return store.getState()[stackKey]
}

export const setGameRefInRedux = gameRef => {
  return dispatch(setGameRef(gameRef));
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

export const updateReduxPlayerStackByKey = (stackKey, newState) => {
  dispatch(updatePlayerStackByKey(stackKey, newState));
}

export const updateReduxFieldStackByKey = (stackKey, newState) => {
  const action = updateFieldStackByKey(stackKey, newState)
  return dispatch(action);
}
