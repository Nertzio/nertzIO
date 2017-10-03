import store from '../redux'
import firebase from 'firebase';
const db = firebase.database();
import { updateStackByPlayer } from '../redux/reduxUtils'



/*  Creating listeners for each stack: */

export function registerUpdateListeners() {
  const game = store.getState().firebaseRefs.game
  db.ref(`games/${game.key}/players`).once('value')
  .then((playersSnapshot) => {
    playersSnapshot.forEach(playerSnapshot => {
      const playerKey = playerSnapshot.key
      playerSnapshot.child('stacks').forEach(stack => {
        let stackKey = stack.key;
        stack.ref.on('value', stackSnapshot => {
          updateStackByPlayer(stackKey, stackSnapshot.val())
        })
      })
    })
  })
}
