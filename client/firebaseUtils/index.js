import firebase from 'firebase';
const database = firebase.database();

const fbaseAddNewGame = () => database.ref('/games').push();
// returns a ref to game instance; thus: ref.set({...stuf}).then(otherStuff);

const fbaseAddPlayerToGame = (gameRef, playerOptions) => {
  return gameRef
}
