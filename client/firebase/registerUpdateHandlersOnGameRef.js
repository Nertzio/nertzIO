import {
  getSnapshotOfAllPlayersByGameRef,
} from './firebase_utils.js';
import {
  updateReduxPlayerStackByKey,
  updateReduxFieldStackByKey
} from '../redux/reduxUtils'


const updateReduxWhenPlayerStacksUpdate = (gameRef) => {
  return getSnapshotOfAllPlayersByGameRef(gameRef)
  .then((playersSnapshot) => {
    playersSnapshot.forEach(playerSnapshot => {
      playerSnapshot.child('stacks').forEach(stack => {
        stack.ref.on('value', stackSnapshot => {
          updateReduxPlayerStackByKey(stack.key, stackSnapshot.val())
        })
      })
    })
  })
}

const updateReduxWhenFieldStacksUpdate = (gameRef) => {
  return gameRef.child('fieldStacks').once('value')
    .then(allFieldStacks => allFieldStacks.forEach(stack => {
      stack.ref.on('value', stackSnapshot => {
        const stackKey = stackSnapshot.key;
        updateReduxFieldStackByKey(stackKey, stackSnapshot.val());
      })
    }))
}

export function registerUpdateHandlersOnGameRef(gameRef) {
  return Promise.all([
    updateReduxWhenFieldStacksUpdate(gameRef),
    updateReduxWhenPlayerStacksUpdate(gameRef)
  ]);
}

