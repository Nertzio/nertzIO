import {
  getSnapshotOfAllPlayersByGameRef,
} from './firebase_utils.js';
import {
  updatePlayerInReduxByKey,
  updateReduxPlayerStackByKey,
  updateReduxFieldStackByKey
} from '../redux/reduxUtils'


const updateReduxWhenFieldStacksUpdate = (gameRef) => {
  return gameRef.child('fieldStacks').once('value')
    .then(allFieldStacks => allFieldStacks.forEach(stack => {
      stack.ref.on('value', stackSnapshot => {
        const stackKey = stackSnapshot.key;
        updateReduxFieldStackByKey(stackKey, stackSnapshot.val());
      })
    }))
}

export const updateReduxWhenPlayerDataChanges = (gameRef) => {
  return gameRef.child('players').once('value')
  .then(allPlayers => {
    allPlayers.forEach(player => {
      player.ref.on('value', updatedPlayer => {
        return updatePlayerInReduxByKey(updatedPlayer.key, updatedPlayer.val())
      })
    })

  })
}

export const updateReduxWhenPlayersJoinGame = (gameRef) => {
  return gameRef.child('players').once('value')
    .then(allPlayers => {
      return allPlayers.ref.on('child_added', (player, prevPlayerKey) => {
        return updatePlayerInReduxByKey(player.key, player.val())
      })
    })
}

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

export function registerUpdateHandlersOnGameRef(gameRef) {
  return Promise.all([
    updateReduxWhenFieldStacksUpdate(gameRef),
    updateReduxWhenPlayerStacksUpdate(gameRef),
    updateReduxWhenPlayerDataChanges(gameRef),
  ]);
}

export const registerUpdateHandlerOnEachPlayer = (gameRef, handler) => {
  return gameRef.child('players').once('value')
    .then(snapshotOfAllPlayers => snapshotOfAllPlayers.forEach(player => {
      player.ref.on('value', handler);
    }))
}
