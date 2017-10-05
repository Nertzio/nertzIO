import store, {
  setGameRef,
  setStackRef,
  updatePlayerByKey, // need to create this action creator
  updatePlayerStackByKey,
  updateFieldStackByKey,
} from '../redux';
const {dispatch} = store;

export const getFirebaseGameRefFromRedux = () => {
  return store.getState().firebaseRefs.game
}

export const setGameRefInRedux = gameRef => {
  dispatch(setGameRef(gameRef));
}

export const storeStackRefInReduxByKey = (stackKey, stackRef) => {
  return dispatch(setStackRef({[stackKey]: stackRef}))
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
