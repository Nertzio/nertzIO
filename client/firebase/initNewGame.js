import {
  setGameRefInRedux,
  storeStackRefInReduxByKey,
  updateReduxPlayerStackByKey,
} from '../redux/reduxUtils'

import {
  goCountAllPlayersInGame,
  registerUpdateHandlersOnGameRef,
  setGameRefForUtils,
  setPlayersToGameRef,
  updateReduxWhenPlayersJoinGame,
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

//sets player data for game instance in db
export const goAddPlayerToGame = (playerData, gameRef) => {
  return gameRef.once('value')
    .then(gameSnapshot => {
      const playerKey = gameSnapshot.child('players').numChildren() + 1;
      return gameRef.child(`players/${playerKey}`).set(playerData);
    })
    .then(() => gameRef)
    .catch(console.error.bind(console));
}

export const addPlayerToGame = (playerData, game) => {
  const gameRef = typeof game === 'string' ? db.ref(`games/${game}`) : game;
  currentGameRef = gameRef;
  setGameRefForUtils(gameRef);
  setGameRefInRedux(gameRef);
  return goAddPlayerToGame(playerData, gameRef)
    .then(() => updateReduxWhenPlayersJoinGame(gameRef))
    .then(() => gameRef)
    .catch(console.error.bind(console));
}

const generateNFieldStackNodes = num => {
  const fieldStacks = {};
  for (let i = 1; i <= num; i++) {
    fieldStacks[`fieldStack${i}`] = false;
  }
  return fieldStacks;
}

//sets fieldStackNodes in db
const set4FieldStacksPerPlayer = () => {
  return goCountAllPlayersInGame()
    .then(numPlayers => {
      currentGameRef
        .child('fieldStacks')
        .set(generateNFieldStackNodes(numPlayers * 4))
    })
}

const storeFieldStackRefsInRedux = (gameInstanceRef) => {
  const gameRef = currentGameRef || gameInstanceRef
  return gameRef.child('fieldStacks').once('value')
    .then(fieldStacks => fieldStacks.forEach(stack => {
      storeStackRefInReduxByKey(stack.key, stack.ref);
    }))
}

const generateStacksForPlayer = (playerNum) => {
  const cards = shuffleNewDeckForPlayer(playerNum);
  return {
    [`p${playerNum}BigStack`]: cards.slice(0, 35),
    [`p${playerNum}DrawnStack`]: false, // placeholder val for firebase
    [`p${playerNum}LittleStack`]: cards.slice(35,48),
    [`p${playerNum}SolitaireStack1`]: cards.slice(48, 49),
    [`p${playerNum}SolitaireStack2`]: cards.slice(49, 50),
    [`p${playerNum}SolitaireStack3`]: cards.slice(50, 51),
    [`p${playerNum}SolitaireStack4`]: cards.slice(51)
  }
}

const linkReduxStacksWithDbByPlayerNum = (playerNum) => {
  const playerRef = currentGameRef.child(`players/${playerNum}`);
  playerRef.child('stacks').once('value')
  .then((snapShotOfAllStacks) => {
    snapShotOfAllStacks.forEach(stack => {
      storeStackRefInReduxByKey(stack.key, stack.ref)
      updateReduxPlayerStackByKey(stack.key, stack.val())
    })
  })
  .catch(console.error.bind(console));
}

const initPlayerAreaByPlayerNum = (playerNum) => {
  const playerRef = currentGameRef.child(`players/${playerNum}`);
  const stacksNode = generateStacksForPlayer(playerNum);
  const settingPlayersStacks = playerRef.child('stacks').set(stacksNode)
  return settingPlayersStacks
    .then(() => linkReduxStacksWithDbByPlayerNum(playerNum))
}

const initAllPlayerAreas = (dbGameInstanceIsPreInitialized) => {
  return goCountAllPlayersInGame()
  .then(numOfPlayers => {
    const playerAreasInitializing = [];
    for (let i = 1; i <= numOfPlayers; i++) {
      //if dbGameInstanceIsPreInitialized, skip creation of nodes in db, just set up Redux to link w/ them
      const initializingArea = dbGameInstanceIsPreInitialized ? linkReduxStacksWithDbByPlayerNum(i) : initPlayerAreaByPlayerNum(i);
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
  2: {
    uid: 13451,
    username: 'dudebro',
    email: 'other@place.com',
  },
  3: {
    uid: 32461,
    username: 'yoloKid',
    email: 'yolo@kid.com',
  },
  4: {
    uid: 37461,
    username: 'chump',
    email: 'chump@chump.com',
  }
}

export const initNewGame = () => {
  return addNewGame()
    .then(() => setPlayersToGameRef(hardCodedPlayers, currentGameRef))
    .then(() => set4FieldStacksPerPlayer())
    .then(() => storeFieldStackRefsInRedux())
    .then(() => initAllPlayerAreas())
    .then(() => registerUpdateHandlersOnGameRef(currentGameRef))
    .catch(console.error.bind(console))
}

export const startGame = () => {
  return set4FieldStacksPerPlayer()
  .then(() => storeFieldStackRefsInRedux())
  .then(() => initAllPlayerAreas())
  .then(() => registerUpdateHandlersOnGameRef(currentGameRef))
  .catch(console.error.bind(console))
}


export const resetReduxForPendingGameInstance = (gameRef) => {
  setGameRefForUtils(gameRef)
  setGameRefInRedux(gameRef)
  updateReduxWhenPlayersJoinGame(gameRef)
}

export const resetReduxForStartedDbGameInstance = (gameRef) => {
  resetReduxForPendingGameInstance(gameRef)
  storeFieldStackRefsInRedux(gameRef)
  initAllPlayerAreas(true)
  registerUpdateHandlersOnGameRef(gameRef)
}

