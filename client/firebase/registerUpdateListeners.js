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
const game = store.getState().game


/*  Work in progress of creating listeners for each stack: */

// db.ref(`games/${game.key}/players`).once('value')
//   .then((playersSnapshot) => {
//     playersSnapshot.forEach(playerSnapshot => {
//       playerSnapshot.child('stacks').forEach(stack => {
//           let stackId = stack.key;
//           let actionCreator = 'update' + stackId

//           stack.ref.on('value', stackSnapshot => {
//             store.dispatch(store.actionCreator())
//           })
//         })
//     })
//   })



// function initializeStackListener(user,stack) {
//   db.ref(`games/${game.key}/players/`).on('value', snapshot => {

//   })
// }
