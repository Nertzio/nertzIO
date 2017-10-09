
import {
  getCurrentUserPlayerRef,
  markCurrentUserPlayerAsListening,
  markCurrentUserPlayerAsNotListening,
  queryAllPlayersInCurrentGame,
} from './firebase_utils.js';

import {
  getCurrentUserInRedux,
  getPlayersInRedux,
  getReduxGameRef,
  setReduxGameProgressStatus,
  storeStackRefInReduxByKey,
  updatePlayerInReduxByKey,
  updateReduxPlayerStackByKey,
  updateReduxFieldStackByKey,
  updatePlayerScoreInReduxByKey,
  updatePlayerListeningStatusInReduxByKey,
} from '../redux/reduxUtils'


// LIFTED LISTENER UP TO PARENT NODE TO WATCH FOR CHILD CHANGES
const updateReduxWhenFieldStacksUpdate = () => {
  console.log('updateReduxWhenFieldStacksUpdate()')

  const fieldStacksRef = getReduxGameRef().child('fieldStacks')
  fieldStacksRef.on('child_added', stack => {
    return storeStackRefInReduxByKey(stack.key, stack.ref);
  })
  fieldStacksRef.on('child_changed', stack => {
      return updateReduxFieldStackByKey(stack.key, stack.val())
    })
  // .once('value')
    // .then(allFieldStacks => allFieldStacks.forEach(stack => {
    //   storeStackRefInReduxByKey(stack.key, stack.ref);
    //   return stack.ref.on('value', stackSnapshot => {
    //     const stackKey = stackSnapshot.key;
    //     return updateReduxFieldStackByKey(stackKey, stackSnapshot.val());
    //   })
    // }))
}

const updateReduxWhenGameStatusChanges = () => {
  console.log('updateReduxWhenGameStatusChanges()')
  return getReduxGameRef()
    .child('isInProgress').on('value', isInProgress => {
      console.log('UPDATING GAME PROGRESS STATUS')
      return setReduxGameProgressStatus(isInProgress.val())
    })
}

// LIFTED LISTENER UP TO PARENT NODE TO WATCH FOR CHILD CHANGES
export const updateReduxWhenPlayerDataChanges = () => {
  console.log('updateReduxWhenPlayerDataChanges()')
  return getReduxGameRef().child('players').once('value')
    .then(players => {
      players.forEach(player => {

        player.child('isListeningForUpdates').ref
          .on('value', listeningStatus => {
            const status = listeningStatus.val();
            return updatePlayerListeningStatusInReduxByKey(player.key, status);
          })

        player.child('score').ref
          .on('value', score => {
            return updatePlayerScoreInReduxByKey(player.key, score.val());
          })
      })
    })

    // .on('child_changed', updatedPlayer => {
    //   return updatePlayerInReduxByKey(updatedPlayer.key, updatedPlayer.val())
    // })

  // .once('value')
  // .then(allPlayers => {
  //   return allPlayers.forEach(player => {
  //     return player.ref.on('child_changed', updatedPlayer => {
  //       return updatePlayerInReduxByKey(updatedPlayer.key, updatedPlayer.val())
  //     })
  //   })
  // })
}

// TODO: this isn't quite right, it's firing whenever a players cards change, we only want this to fire when a new player joins the game.
// export const updateReduxForEachPlayerAddedToGame = (gameRef) => {
//   return gameRef.child('players').once('value')
//     .then(allPlayers => {
//       return allPlayers.ref.on('child_added', (player, prevPlayerKey) => {
//         return updatePlayerInReduxByKey(player.key, player.val())
//       })
//     })
// }

export const updateReduxForEachPlayerAddedToGame = () => {
  return getReduxGameRef().child('players')
  .on('child_added', (player, prevPlayerKey) => {
    console.log('updateReduxForEachPlayerAddedToGame')
      console.log('child_added handler')
      if (player) {
        return updatePlayerInReduxByKey(player.key, player.val())
      }
    })
}

// export const updateReduxForEachPlayerAddedToGame = (gameRef) => {
//   return gameRef.child('players').on('value', playersSnapshot => {
//     const priorPlayerKeys = Object.keys(getPlayersInRedux()).map(key => +key);
//     const allPlayerKeys = Object.keys(playersSnapshot.val()).map(key => +key);
//     const newPlayerKey = allPlayerKeys
//       .filter(key => !(priorPlayerKeys.includes(key)))[0]
//     const newPlayerData = playersSnapshot.val()[newPlayerKey];
//     return updatePlayerInReduxByKey(newPlayerKey, newPlayerData)
//   })
// }

const makeStackNamesForPlayer = playerNum => ([
  `p${playerNum}BigStack`,
  `p${playerNum}DrawnStack`,
  `p${playerNum}LittleStack`,
  `p${playerNum}SolitaireStack1`,
  `p${playerNum}SolitaireStack2`,
  `p${playerNum}SolitaireStack3`,
  `p${playerNum}SolitaireStack4`
])

// LIFTED LISTENER UP TO PARENT NODE TO WATCH FOR CHILD CHANGES
const updateReduxWhenPlayerStacksUpdate = () => {
  console.log('updateReduxWhenPlayersStacksUpdate()')

  return queryAllPlayersInCurrentGame()
  .then((playersSnapshot) => {
    return playersSnapshot.forEach(player => {

      const stacksRef = player.child('stacks').ref;
      stacksRef.on('child_added', stack => {
        return storeStackRefInReduxByKey(stack.key, stack.ref);
      })

      const stackNames = makeStackNamesForPlayer(player.key);
      stackNames.forEach(stackName => {
        return stacksRef.child(stackName)
          .on('value', stack => {
            return updateReduxPlayerStackByKey(stack.key, stack.val())
          })
      })

      // return playerSnapshot.child('stacks').forEach(stack => {
      //   return stack.ref.on('value', stackSnapshot => {
      //     return updateReduxPlayerStackByKey(stack.key, stackSnapshot.val())
      //   })
      // })
    })
  })
}

export function registerUpdateHandlersOnGameRef() {
  console.log('registerUpdateHandlersOnGameRef()')
  return Promise.all([
    updateReduxWhenGameStatusChanges(),
    updateReduxWhenFieldStacksUpdate(),
    updateReduxWhenPlayerStacksUpdate(),
    updateReduxWhenPlayerDataChanges(),
  ])
  .then(() => markCurrentUserPlayerAsListening())
  .catch(console.error.bind(console));
}

export const registerUpdateHandlerOnEachPlayer = (handler) => {
  return getReduxGameRef().child('players').once('value')
    .then(snapshotOfAllPlayers => snapshotOfAllPlayers.forEach(player => {
      player.ref.on('value', handler);
    }))
}
