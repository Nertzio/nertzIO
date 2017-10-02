import store, {
  setGameRef,
  updateP1BigStack,
  updateP1DrawnStack,
  updateP1LittleStack,
  updateP1Solitaire1Stack,
  updateP1Solitaire2Stack,
  updateP1Solitaire3Stack,
  updateP1Solitaire4Stack,
} from '../redux';

const {dispatch} = store;
import {shuffleNewDeckForPlayer} from '../gameUtils';
import {registerUpdateListeners} from './registerUpdateListeners';
import firebase from 'firebase';
const db = firebase.database();

export const addNewGame = () => {
  const newGameRef = db.ref('games').push();
  dispatch(setGameRef(newGameRef));
  return newGameRef;
}
// ^ returns thenable ref to game instance

export const setPlayersToGameRef = (players) => {
  const gameRef = store.getState().game.gameRef;
  return gameRef.set({ players: {...players} });
}

export const initPlayerAreaByNum = (playerNum) => {
  const gameRef = store.getState().game.gameRef;
  const playerRef = gameRef.child(`players/${playerNum}`).ref;
  const cards = shuffleNewDeckForPlayer(playerNum);
  const BigStack = cards.slice(0, 35);
  const DrawnStack = [];
  const LittleStack = cards.slice(35,48);
  const Solitaire1Stack = cards.slice(48, 49);
  const Solitaire2Stack = cards.slice(49, 50);
  const Solitaire3Stack = cards.slice(50, 51);
  const Solitaire4Stack = cards.slice(51);
  const updatePlayer = playerRef.update({
    [`p${playerNum}BigStack`]: BigStack,
    [`p${playerNum}DrawnStack`]: DrawnStack,
    [`p${playerNum}LittleStack`]: LittleStack,
    [`p${playerNum}Solitaire1Stack`]: Solitaire1Stack,
    [`p${playerNum}Solitaire2Stack`]: Solitaire2Stack,
    [`p${playerNum}Solitaire3Stack`]: Solitaire3Stack,
    [`p${playerNum}Solitaire4Stack`]: Solitaire4Stack,
  })
  return updatePlayer.then(() => {
    dispatch(updateP1BigStack(BigStack));
    dispatch(updateP1DrawnStack(DrawnStack));
    dispatch(updateP1LittleStack(LittleStack));
    dispatch(updateP1Solitaire1Stack(Solitaire1Stack));
    dispatch(updateP1Solitaire2Stack(Solitaire2Stack));
    dispatch(updateP1Solitaire3Stack(Solitaire3Stack));
    dispatch(updateP1Solitaire4Stack(Solitaire4Stack));
  })
}


const hardCodedPlayers = {
  '1': { // all games have players 1-4
    'uid': 6346, //  uid from firebase.auth().currentUser
    'username': 'neatGuy',
    'email': 'neatguy@email.com'
  },
  // '2': {
  //   uid: 13451,
  //   username: 'dudebro',
  //   email: 'other@place.com',
  // },
  // '3': {
  //   uid: 32461,
  //   username: 'yoloKid',
  //   email: 'yolo@kid.com',
  // }
}

export const initGame = () => {
  return addNewGame()
    .then(() => setPlayersToGameRef(hardCodedPlayers))
    .then(() => initPlayerAreaByNum(1))
    .then(() => registerUpdateListeners())
    .catch(console.error.bind(console))
      // add players
      // generate player area stacks
      // set card field
}
