import {
  registerUpdateListeners,
} from '../firebase';
import {
  setGameRefInRedux,
  storeStackRefInReduxByKey,
  updateReduxStackByKey,
} from '../redux/reduxUtils'
import {shuffleNewDeckForPlayer} from '../gameUtils';
import firebase from 'firebase';
const db = firebase.database();

/* --------------- THE GLOBAL REF TO GAME IN FIREBASE ---------------
                               * * *
                                * *
                                 *
                      * */let currentGameRef;/* *
                                 *
                                * *
                               * * *
   ------------------------------------------------------------------*/

const getExistingGameRefByKey = gameKey => {
  currentGameRef = db.ref(`games/${gameKey}`)
  setGameRefInRedux(currentGameRef);
  return Promise.resolve(currentGameRef);
}

export const sendGameStateToRedux = () => {
  return currentGameRef.child('players').once('value')
  .then(playersSnapshot => {
    playersSnapshot.forEach(playerSnapshot => {
      playerSnapshot.child('stacks').forEach(stack => {
        storeStackRefInReduxByKey(stack.key, stack.ref);
        updateReduxStackByKey(stack.key, stack.val())
      })
    })
  })
  .catch(console.error.bind(console))
}

export const initExistingGameByKey = gameKey => {
  getExistingGameRefByKey(gameKey)
  .then(() => sendGameStateToRedux())
  .then(() => registerUpdateListeners())
  .catch(console.error.bind(console))
}
