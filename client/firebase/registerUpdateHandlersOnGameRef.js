import {
  getSnapshotOfAllPlayersByGameRef,
} from './firebase_utils.js';
import {
  getReduxGameRef,
  getPlayersInStore,
  setReduxGameProgressStatus,
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

const updateReduxWhenGameStatusChanges = () => {
  console.log('updateReduxWhenGameStatusChanges()')
  return getReduxGameRef()
    .child('isInProgress').on('value', isInProgress => {
      console.log('UPDATING GAME PROGRESS STATUS')
      return setReduxGameProgressStatus(isInProgress.val())
    })
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

// TODO: this isn't quite right, it's firing whenever a players cards change, we only want this to fire when a new player joins the game.
export const updateReduxWhenPlayersJoinGame = (gameRef) => {
  return gameRef.child('players').once('value')
    .then(allPlayers => {
      return allPlayers.ref.on('child_added', (player, prevPlayerKey) => {
        return updatePlayerInReduxByKey(player.key, player.val())
      })
    })
}

// export const updateReduxWhenPlayersJoinGame = (gameRef) => {
//   return gameRef.child('players').on('value', playersSnapshot => {
//     const priorPlayerKeys = Object.keys(getPlayersInStore()).map(key => +key);
//     const allPlayerKeys = Object.keys(playersSnapshot.val()).map(key => +key);
//     const newPlayerKey = allPlayerKeys
//       .filter(key => !(priorPlayerKeys.includes(key)))[0]
//     const newPlayerData = playersSnapshot.val()[newPlayerKey];
//     return updatePlayerInReduxByKey(newPlayerKey, newPlayerData)
//   })
// }

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
    updateReduxWhenGameStatusChanges(),
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
