import {
  getFirebaseGameRefFromRedux,
  storeStackRefInReduxByKey,
  updateReduxPlayerStackByKey,
} from '../redux/reduxUtils'

import {shuffleNewDeckForPlayer} from '../gameUtils';
import {registerUpdateHandlersOnGameRef} from './registerUpdateHandlersOnGameRef';
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

export const handleAddingPlayerToGame = (playerData, game) => {
  return goAddPlayerToGame(playerData, game)
    .then(gameRef => registerHandlerForPlayerUpdates)
}

export const getSnapshotOfAllPlayersByGameRef = (currentGameRef) => {
  return currentGameRef.child('players').once('value');
}


export const goAddPlayerToGame = (playerData, game) => {
  const gameRef = typeof game === 'string' ? db.ref('games/${game}') : game;
  return gameRef.once('value')
    .then(gameSnapshot => {
      const playerKey = gameSnapshot.numChildren() + 1;
      return gameRef.child(`players/${playerKey}`).set(playerData);
    })
    .then(() => gameRef)
    .catch(console.error.bind(console));
}

export const goCountAllPlayersInGame = () => {
  return getSnapshotOfAllPlayersByGameRef(currentGameRef)
    .then(snapshot => snapshot.numChildren())
}

const registerHandlerForPlayerUpdates = (gameRef, handler) => {
  return gameRef.child('players').once('value')
    .then(snapshotOfAllPlayers => snapshotOfAllPlayers.forEach(player => {
      player
    }))
}

export const setPlayersToGameRef = (players, gameRef) => {
  return gameRef.set({ players: {...players} });
}

export const setGameRefForUtils = gameRef => {
  currentGameRef = gameRef;
}

export const updateStackByPlayerAndKey = (playerNum, stackKey, stackVal) => {
  return currentGameRef
    .child(`players/${playerNum}/stacks/${stackKey}`)
    .set(stackVal);
}
