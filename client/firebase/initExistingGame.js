import {
  registerUpdateHandlersOnGameRef,
  setGameRefForUtils,
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
  setGameRefForUtils(currentGameRef);
  setGameRefInRedux(currentGameRef);
  return Promise.resolve(currentGameRef);
}

const sendPlayerStacksStateToRedux = () => {
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

const sendFieldStacksStateToRedux = () => {
  return currentGameRef.child('FieldStacks').once('value')
  .then(fieldStacks => {
    fieldStacks.forEach(stack => {
      const reduxStackKey = `GameFieldStack${stackSnapshot.key}`;
      storeStackRefInReduxByKey(reduxStackKey, stack.ref);
      updateReduxStackByKey(reduxStackKey, stack.val())
    })
  })
  .catch(console.error.bind(console))
}

export const sendGameStateToRedux = () => {
  return sendFieldStacksStateToRedux()
    .then(() => sendPlayerStacksStateToRedux())
    .catch(console.error.bind(console));
}

export const initExistingGameByKey = gameKey => {
  getExistingGameRefByKey(gameKey)
  .then(() => sendGameStateToRedux())
  .then(() => registerUpdateHandlersOnGameRef(currentGameRef))
  .catch(console.error.bind(console))
}
