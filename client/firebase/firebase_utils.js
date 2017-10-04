import {
  getFirebaseGameRefFromRedux,
  updateReduxStackByKey,
} from '../redux/reduxUtils'
import {shuffleNewDeckForPlayer} from '../gameUtils';
import {registerUpdateListeners} from './registerUpdateListeners';
import firebase from 'firebase';
const db = firebase.database();

/* --------------- THE GLOBAL REF TO GAME IN FIREBASE ---------------
                               * * *
                                * *
                                 *
   * */ const currentGameRef = getFirebaseGameRefFromRedux(); /* *
                                 *
                                * *
                               * * *
   ------------------------------------------------------------------*/

export const getSnapshotOfAllPlayersByGameRef = (currentGameRef) => {
  return currentGameRef.child('players').once('value');
}

export const setPlayersToGameRef = (players, gameRef) => {
  return gameRef.set({ players: {...players} });
}

export const updateStackByPlayerAndKey = (playerNum, stackKey, stackVal) => {
  return currentGameRef
    .child(`players/${playerNum}/stacks/${stackKey}`)
    .set(stackVal);
}
