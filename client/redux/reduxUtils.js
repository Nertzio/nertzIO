import {
  findCurrentUserInPlayers,
  getUserPlayerNum,
} from '../vanillaUtils';
import store, {
  setGameRef,
  setStackRef,
  userActionTaken,
  requireUserAction,
  startLoading,
  stopLoading,
  updatePlayerByKey, // need to create this action creator
  updatePlayerStackByKey,
  updateFieldStackByKey,
} from '../redux';
const {dispatch} = store;

export const countCardsInUserLittleStackInRedux = () => {
  const {user, players} = store.getState();
  const currentUserPlayer = findCurrentUserInPlayers(user, players);
  const playerNum = getUserPlayerNum(user, players);
  const littleStack = currentUserPlayer.stacks[`p${playerNum}LittleStack`];
  return littleStack.length === 0;
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
  dispatch(setGameRef(gameRef));
}

export const storeStackRefInReduxByKey = (stackKey, stackRef) => {
  return dispatch(setStackRef({[stackKey]: stackRef}))
}

export const tellReduxModalIsClosed = () => {
  return dispatch(userActionTaken());
}

export const tellReduxModalIsOpen = () => {
  return dispatch(requireUserAction());
}

export const tellReduxImLoading = () => {
  return dispatch(startLoading());
}

export const tellReduxImDoneLoading = () => {
  return dispatch(stopLoading());
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
