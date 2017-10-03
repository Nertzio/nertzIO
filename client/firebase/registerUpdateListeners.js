import store from '../redux'
import firebase from 'firebase';
const db = firebase.database();

// dispatch update to redux for:
// p1BigStack
// p1DrawnStack
// p1LittleStack
// p1Solitaire1Stack
// p1Solitaire2Stack
// p1Solitaire3Stack
// p1Solitaire4Stack
const game = store.getState().firebaseRefs.game


/*  Work in progress of creating listeners for each stack: */

export function registerUpdateListeners() {
  db.ref(`games/${game.key}/players`).once('value')
  .then((playersSnapshot) => {
    playersSnapshot.forEach(playerSnapshot => {
      const playerKey = playerSnapshop.key
      playerSnapshot.child('stacks').forEach(stack => {
        let stackKey = stack.key;
        stack.ref.on('value', stackSnapshot => {
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
