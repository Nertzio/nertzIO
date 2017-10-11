import {
  getFirebaseGameRefFromRedux
} from '../redux/reduxUtils';

const getGame = () => getFirebaseGameRefFromRedux();

export const updateDbWithNertzCall = (numOfPlayerWhoCalledNertz) => {
  const currentGameRef = getGame();
  currentGameRef.child('nertzHasBeenCalled').set(true);
  currentGameRef.child('numOfPlayerWhoCalledNertz').set(numOfPlayerWhoCalledNertz);
}
