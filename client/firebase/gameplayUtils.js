import {
  getFirebaseGameRefFromRedux,
  getStackInStoreByKey
} from '../redux/reduxUtils';
import {
  getStackRefByKey,
} from './firebase_utils';

const getGame = () => getFirebaseGameRefFromRedux();

const clearDrawnStackForPlayer = (playerNum) => {
  const gameRef = getGame();
  return gameRef
    .child(`players/${playerNum}/stacks/p${playerNum}DrawnStack`)
    .set(false)
    .then(() => gameRef)
    .catch(console.error.bind(console));
}

const setBigStackForPlayer = (playerNum, stack) => {
  const gameRef = getGame();
  return gameRef
    .child(`players/${playerNum}/stacks/p${playerNum}BigStack`)
    .set(stack)
    .then(() => gameRef)
    .catch(console.error.bind(console));
}

export const restartBigStackForPlayer = (playerNum) => {
  // WAS USED FOR 'RESET BIG STACK' BUTTON
  // const bigStack = getStackInStoreByKey(`p${playerNum}BigStack`);
  const drawnStack = getStackInStoreByKey(`p${playerNum}DrawnStack`);
  drawnStack.reverse() // mutate to maintain LIFO
  return Promise.all([
    // WAS USED FOR 'RESET BIG STACK' BUTTON
    // setBigStackForPlayer(playerNum, [...bigStack, ...drawnStack])
    setBigStackForPlayer(playerNum, [...drawnStack]),
    clearDrawnStackForPlayer(playerNum)
  ])
  .catch(console.error.bind(console));
}

export const flip3ForPlayer = (playerNum) => {
  const reduxBigStack = getStackInStoreByKey(`p${playerNum}BigStack`);
  if (!reduxBigStack.length) return restartBigStackForPlayer(playerNum);
  const reduxDrawnStack = getStackInStoreByKey(`p${playerNum}DrawnStack`)
  const drawnCards = reduxBigStack.slice(-3).reverse(); // maintaining LIFO
  const remainingCards = reduxBigStack.length <= 3
    ? false // placeholder for firebase so the node isn't erased
    : reduxBigStack.slice(0, -3);
  return Promise.all([
    getStackRefByKey(`p${playerNum}BigStack`).set(remainingCards),
    getStackRefByKey(`p${playerNum}DrawnStack`).set([...reduxDrawnStack, ...drawnCards])
  ])
    .catch(console.error.bind(console));
}

export const updateDbWithPauseStatus = () => {
  const currentGameRef = getGame();
  const currentDbPauseStatus = currentGameRef.child('isGamePaused').once('value')
  .then(pauseSnapshot => pauseSnapshot.val())
  currentGameRef.child('isGamePaused').set(!currentDbPauseStatus)
}

