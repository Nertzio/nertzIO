import store from '../redux'
import firebase from 'firebase';
const db = firebase.database();
import { updateStackByPlayer } from '../redux/reduxUtils'

// dispatch update to redux for:
// p1BigStack
// p1DrawnStack
// p1LittleStack
// p1Solitaire1Stack
// p1Solitaire2Stack
// p1Solitaire3Stack
// p1Solitaire4Stack

/*  Work in progress of creating listeners for each stack: */

export function registerUpdateListeners() {
  const game = store.getState().firebaseRefs.game
  console.log("GAME", game)
  console.log("Register function fired!")
  db.ref(`games/${game.key}/players`).once('value')
  .then((playersSnapshot) => {
    playersSnapshot.forEach(playerSnapshot => {
      const playerKey = playerSnapshot.key
      console.log("PLAYER KEY", playerKey)
      playerSnapshot.child('stacks').forEach(stack => {
        let stackKey = stack.key;
        console.log("STACK KEY", stackKey)
        stack.ref.on('value', stackSnapshot => {
          console.log("STACK SNAPSHOT VAL", stackSnapshot.val())
          updateStackByPlayer(stackKey, stackSnapshot.val())
        })
      })
    })
  })
}



// function initializeStackListener(user,stack) {
//   db.ref(`games/${game.key}/players/`).on('value', snapshot => {

//   })
// }
