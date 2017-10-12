import {
  getReduxGameRef,
  getFirebaseGameRefFromRedux,
  storeStackRefInReduxByKey,
  updatePlayerInReduxByKey,
  updateReduxPlayerStackByKey,
} from '../redux/reduxUtils'

import {shuffleNewDeckForPlayer} from '../gameUtils';
import {
  registerUpdateHandlersOnGameRef,
  updateReduxWhenPlayersJoinGame,
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


export const getSnapshotOfAllPlayersByGameRef = (currentGameRef) => {
  return currentGameRef.child('players').once('value');
}

export const getSnapshotOfStackByKey = (stackKey) => {
  const playerNum = stackKey[1];
  return currentGameRef.child(`players/${playerNum}/stacks/${stackKey}`)
    .once('value')
}

export const getStackRefByKey = (stackKey) => {
  const playerNum = stackKey[1];
  return currentGameRef.child(`players/${playerNum}/stacks/${stackKey}`)
}

export const goCountAllPlayersInGame = () => {
  return getSnapshotOfAllPlayersByGameRef(currentGameRef)
    .then(snapshot => snapshot.numChildren())
}

export const markGameAsInProgress = () => {
  return getReduxGameRef().update({isInProgress: true})
    .catch(console.error.bind(console));
}

export const markGameAsUnpaused = () => {
  return getReduxGameRef().update({isGamePaused: false})
    .catch(console.error.bind(console));
}

export const setPlayersToGameRef = (players, gameRef) => {
  return gameRef.set({ players: {...players} });
}

export const setGameRefForUtils = gameRef => {
  currentGameRef = gameRef;
}

export const updatePlayerInFirebaseByKey = (playerNum, playerData) => {
  return currentGameRef.child(`players/${playerNum}`).update(playerData);
}

export const updateStackByPlayerAndKey = (playerNum, stackKey, stackVal) => {
  return currentGameRef
    .child(`players/${playerNum}/stacks/${stackKey}`)
    .update(stackVal);
}
