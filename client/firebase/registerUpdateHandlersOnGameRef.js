import store from '../redux'
import firebase from 'firebase';
import {
  getSnapshotOfAllPlayersByGameRef,
} from './firebase_utils.js';
const db = firebase.database();
import { updateReduxStackByKey } from '../redux/reduxUtils'


const updateReduxWhenPlayerStacksUpdate = (gameRef) => {
  return getSnapshotOfAllPlayersByGameRef(gameRef)
  .then((playersSnapshot) => {
    playersSnapshot.forEach(playerSnapshot => {
      playerSnapshot.child('stacks').forEach(stack => {
        stack.ref.on('value', stackSnapshot => {
          updateReduxStackByKey(stack.key, stackSnapshot.val())
        })
      })
    })
  })
}

const updateReduxWhenFieldStacksUpdate = (gameRef) => {
  return gameRef.child('FieldStacks').once('value')
    .then(allFieldStacks => allFieldStacks.forEach(stack => {
      stack.ref.on('value', stackSnapshot => {
        const reduxStackKey = `FieldStack${stackSnapshot.key}`;
        updateReduxStackByKey(reduxStackKey, stackSnapshot.val());
      })
    }))
}

export function registerUpdateHandlersOnGameRef(gameRef) {
  return Promise.all([
    updateReduxWhenFieldStacksUpdate(gameRef),
    updateReduxWhenPlayerStacksUpdate(gameRef)
  ]);
}

