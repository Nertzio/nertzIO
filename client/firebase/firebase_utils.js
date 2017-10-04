import {
  getFirebaseGameRefFromRedux,
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
export const getSnapshotOfAllPlayersByGameRef = (currentGameRef) => {
  return currentGameRef.child('players').once('value');
}

export const goCountAllPlayersInGame = () => {
  return getSnapshotOfAllPlayersByGameRef(currentGameRef)
    .then(snapshot => snapshot.numChildren())
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
