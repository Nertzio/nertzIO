import {
  setGameRefInRedux,
  storeStackRefInReduxByKey,
  updateReduxPlayerStackByKey,
} from '../redux/reduxUtils'

import {
  getSnapshotOfAllPlayersByGameRef,
  goCountAllPlayersInGame,
  registerUpdateHandlersOnGameRef,
  setGameRefForUtils,
  setPlayersToGameRef,
} from '../firebase';

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

export const addNewGame = () => {
  currentGameRef = db.ref('games').push();
  setGameRefForUtils(currentGameRef);
  setGameRefInRedux(currentGameRef);
  return currentGameRef;
}

// create a function that dynamically generates a fieldStacks node, like so:
// {
//   fieldStack1: ...,
//   fieldStack2: ...,
// }

const generateNFieldStackNodes = n => {
  const fieldStacks = {};
  for (let i = 1; i <= n; i++) {
    fieldStacks[`fieldStack${i}`] = false;
  }
  return fieldStacks;
}

const set4FieldStacksPerPlayer = () => {
  return goCountAllPlayersInGame()
    .then(numPlayers => {
      currentGameRef
        .child('FieldStacks')
        .set(generateNFieldStackNodes(numPlayers * 4))
    })
}

const generateStacksForPlayer = (playerNum) => {
  const cards = shuffleNewDeckForPlayer(playerNum);
  return {
    [`p${playerNum}BigStack`]: cards.slice(0, 35),
    [`p${playerNum}DrawnStack`]: false, // placeholder val for firebase
    [`p${playerNum}LittleStack`]: cards.slice(35,48),
    [`p${playerNum}Solitaire1Stack`]: cards.slice(48, 49),
    [`p${playerNum}Solitaire2Stack`]: cards.slice(49, 50),
    [`p${playerNum}Solitaire3Stack`]: cards.slice(50, 51),
    [`p${playerNum}Solitaire4Stack`]: cards.slice(51)
  }
}

const initPlayerAreaByPlayerNum = (playerNum) => {
  const playerRef = currentGameRef.child(`players/${playerNum}`);
  const stacksNode = generateStacksForPlayer(playerNum);
  const settingPlayersStacks = playerRef.child('stacks').set(stacksNode)
  return settingPlayersStacks
    .then(() => playerRef.child('stacks').once('value'))
    .then((snapShotOfAllStacks) => {
      snapShotOfAllStacks.forEach(stack => {
        storeStackRefInReduxByKey(stack.key, stack.ref)
        updateReduxPlayerStackByKey(stack.key, stack.val())
      })
    })
    .catch(console.error.bind(console));
}

const initAllPlayerAreas = () => {
  // return getSnapshotOfAllPlayersByGameRef(currentGameRef)
  // .then(snapshotOfAllPlayers => snapshotOfAllPlayers.numChildren())
  return goCountAllPlayersInGame()
  .then(numOfPlayers => {
    const playerAreasInitializing = [];
    for (let i = 1; i <= numOfPlayers; i++) {
      const initializingArea = initPlayerAreaByPlayerNum(i);
      playerAreasInitializing.push(initializingArea)
    }
    return Promise.all(playerAreasInitializing);
  })
  .catch(console.error.bind(console));
}

const hardCodedPlayers = {
  1: { // all games have players 1-4
    uid: 6346, //  uid from firebase.auth().currentUser
    username: 'neatGuy',
    email: 'neatguy@email.com'
  },
  // 2: {
  //   uid: 13451,
  //   username: 'dudebro',
  //   email: 'other@place.com',
  // },
  // 3: {
  //   uid: 32461,
  //   username: 'yoloKid',
  //   email: 'yolo@kid.com',
  // },
  // 4: {
  //   uid: 37461,
  //   username: 'chump',
  //   email: 'chump@chump.com',
  // }
}

export const initNewGame = () => {
  return addNewGame()
    .then(() => setPlayersToGameRef(hardCodedPlayers, currentGameRef))
    .then(() => set4FieldStacksPerPlayer())
    .then(() => initAllPlayerAreas())
    .then(() => registerUpdateHandlersOnGameRef(currentGameRef))
    .catch(console.error.bind(console))
}
