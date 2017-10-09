import {
  getCurrentUserInRedux,
  getPlayersInRedux,
  getReduxGameRef,
  storeStackRefInReduxByKey,
  updatePlayerInReduxByKey,
  updateReduxPlayerStackByKey,
} from '../redux/reduxUtils'

import {getUserPlayerNum} from '../vanillaUtils';
import {shuffleNewDeckForPlayer} from '../gameUtils';
import {
  registerUpdateHandlersOnGameRef,
  updateReduxForEachPlayerAddedToGame,
} from './registerUpdateHandlersOnGameRef';

import firebase from 'firebase';
const db = firebase.database();

/* --------------- THE GLOBAL REF TO GAME IN FIREBASE ---------------
                               * * *
                                * *
                                 *
                   * */ let currentGameRef; /* *
                                 *
                                * *
                               * * *
------------------------------------------------------------------*/

export const getCurrentUserPlayerRef = () => {
  const key = getUserPlayerNum(getCurrentUserInRedux(), getPlayersInRedux());
  console.log(`getCurrentUserPlayerRef() - currentUser: ${getCurrentUserInRedux()} - playersInRedux: ${getPlayersInRedux()} - currentPlayerNum: ${key}`)
  return getReduxGameRef().child(`players/${key}`)
}


export const getSnapshotOfStackByKey = (stackKey) => {
  const playerNum = stackKey[1];
  return getReduxGameRef()
    .child(`players/${playerNum}/stacks/${stackKey}`)
    .once('value')
}

export const getStackRefByKey = (stackKey) => {
  const playerNum = stackKey[1];
  return getReduxGameRef()
    .child(`players/${playerNum}/stacks/${stackKey}`)
}


export const getGameRefByKey = (gameKey) => {
  return db.ref(`games/${gameKey}`);
}

export const goCountAllPlayersInGame = () => {
  return queryAllPlayersInCurrentGame()
  .then(snapshot => snapshot.numChildren())
}

export const markCurrentUserPlayerAsListening = () => {
  console.log('markCurrentUserPlayerAsListening()')
  return getCurrentUserPlayerRef().update({isListeningForUpdates: true})
}

export const markCurrentUserPlayerAsNotListening = () => {
  return getCurrentUserPlayerRef().update({isListeningForUpdates: false})
}

export const markGameAsInProgress = () => {
  return getReduxGameRef().update({isInProgress: true})
    .catch(console.error.bind(console));
}

export const markGameAsNotInProgress = () => {
  return getReduxGameRef().update({isInProgress: false})
    .catch(console.error.bind(console));
}

export const queryAllPlayersByGameRef = (gameRef) => {
  return gameRef
    .child('players').once('value');
}

export const queryAllPlayersInCurrentGame = () => {
  return getReduxGameRef()
    .child('players')
    .once('value')
}

export const queryCurrentUserPlayer = () => {
  const key = getUserPlayerNum(getCurrentUserInRedux(), getPlayersInRedux());
  return getReduxGameRef().child(`players/${key}`).once('value')
}

export const setPlayersToGameRef = (players, gameRef) => {
  return gameRef.set({ players: {...players} });
}

export const setGameRefForUtils = gameRef => {
  currentGameRef = gameRef;
}

export const updatePlayerInDbByKey = (playerNum, playerData) => {
  return getReduxGameRef()
    .child(`players/${playerNum}`).update(playerData);
}

export const updateStackByPlayerAndKey = (playerNum, stackKey, stackVal) => {
  return getReduxGameRef()
    .child(`players/${playerNum}/stacks/${stackKey}`)
    .update(stackVal);
}
