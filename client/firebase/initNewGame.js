import {
  checkIfUserIsAmongPlayers,
} from '../vanillaUtils';

import {
  getCurrentUserInRedux,
  getReduxGameRef,
  setGameRefInRedux,
  storeStackRefInReduxByKey,
  updateReduxPlayerStackByKey,
} from '../redux/reduxUtils'

import {
  goCountAllPlayersInGame,
  markGameAsInProgress,
  registerUpdateHandlersOnGameRef,
  setGameRefForUtils,
  setPlayersToGameRef,
  updateReduxForEachPlayerAddedToGame,
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

export const postNewGameStoreInRedux = () => {
  const gameRef = db.ref('games').push({
    players: false,
    fieldStacks: false,
    isInProgress: false,
  });
  // setGameRefForUtils(gameRef);
  setGameRefInRedux(gameRef);
  return gameRef;
}

export const postNewPrivateGameStoreInRedux = () => {
  console.log('postNewPrivateGameStoreInRedux()')
  postNewGameStoreInRedux().child('private').set(true);
  return getReduxGameRef();
}

export const postNewPublicGameStoreInRedux = () => {
  postNewGameStoreInRedux().child('private').set(false);
  return getReduxGameRef();
}

export const dressUpAsPlayer = (user) => {
  const playerProps = {
    isListeningForUpdates: false,
    stacks: false,
    score: 0
  }
  return {...user, ...playerProps}
}

export const addUserToCurrentGame = () => {
  const gameRef = getReduxGameRef();
  return gameRef.child('players').once('value')
    .then(players => {
      const userIsAlreadyInGame = checkIfUserIsAmongPlayers(players.val());
      if (!userIsAlreadyInGame) {
        const newKey = players.numChildren() + 1;
        const player = dressUpAsPlayer(getCurrentUserInRedux());
        return players.child(newKey).ref.set(player);
      }
    })
    .then(() => updateReduxForEachPlayerAddedToGame())
    .catch(console.error.bind(console));
}

const generateNFieldStackNodes = num => {
  const fieldStacks = {};
  for (let i = 1; i <= num; i++) {
    fieldStacks[`fieldStack${i}`] = false;
  }
  return fieldStacks;
}

const set4FieldStacksPerPlayer = () => {
  return goCountAllPlayersInGame()
    .then(numPlayers => {
      return getReduxGameRef()
        .child('fieldStacks')
        .set(generateNFieldStackNodes(numPlayers * 4))
    })
}

const storeFieldStackRefsInRedux = () => {
  return getReduxGameRef().child('fieldStacks').once('value')
    .then(fieldStacks => fieldStacks.forEach(stack => {
      return storeStackRefInReduxByKey(stack.key, stack.ref);
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

const initPlayerAreaByPlayerNum = (playerNum) => {
  console.log(`initPlayerAreaByPlayerNum(${playerNum})`)
  const playerRef = getReduxGameRef().child(`players/${playerNum}`);
  const stacksNode = generateStacksForPlayer(playerNum);
  const settingPlayersStacks = playerRef.child('stacks').set(stacksNode)
  return settingPlayersStacks
  // THIS NEEDS TO HAPPEN ON ALL CLIENTS, NOT JUST P1
  // .then(() => playerRef.child('stacks').once('value'))
    // .then((snapShotOfAllStacks) => {
    //   return snapShotOfAllStacks.forEach(stack => {
    //     console.log('storing stack ref for ', stack.key);
    //     return storeStackRefInReduxByKey(stack.key, stack.ref)
    //     // updateReduxPlayerStackByKey(stack.key, stack.val())
    //   })
    // })
    .catch(console.error.bind(console));
}

const initAllPlayerAreas = () => {
  console.log('initAllPlayerAreas()')
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
  return postNewGameStoreInRedux()
    .then(() => setPlayersToGameRef(hardCodedPlayers, currentGameRef))
    .then(() => set4FieldStacksPerPlayer())
    .then(() => storeFieldStackRefsInRedux())
    .then(() => initAllPlayerAreas())
    .then(() => registerUpdateHandlersOnGameRef(currentGameRef))
    .catch(console.error.bind(console))
}

export const startGame = () => {
  return markGameAsInProgress()
  .then(() => set4FieldStacksPerPlayer())
  // .then(() => storeFieldStackRefsInRedux())
  .then(() => initAllPlayerAreas())
  // .then(() => registerUpdateHandlersOnGameRef())
  .catch(console.error.bind(console))
}
