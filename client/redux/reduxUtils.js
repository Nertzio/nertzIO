import store, {
  setGameRef,
  setStackRef,
} from '../redux';
const {dispatch} = store;

import * as bulkActionCreators from '../redux'
const {
  updateP1BigStack,
  updateP1DrawnStack,
  updateP1LittleStack,
  updateP1Solitaire1Stack,
  updateP1Solitaire2Stack,
  updateP1Solitaire3Stack,
  updateP1Solitaire4Stack,
} = bulkActionCreators;

export const getFirebaseGameRefFromRedux = () => {
  return store.getState().firebaseRefs.game
}

export const setGameRefInRedux = gameRef => {
  dispatch(setGameRef(gameRef));
}

export const storeStackRefInReduxByKey = (stackKey, stackRef) => {
  return dispatch(setStackRef({[stackKey]: stackRef}))
}

export function updateReduxStackByKey(stackKey, newState) {
  const PascalCaseStackKey = stackKey[0].toUpperCase() + stackKey.slice(1);
  const actionCreatorKey = `update${PascalCaseStackKey}`
  store.dispatch(bulkActionCreators[actionCreatorKey](newState))
}
