import {
  getFirebaseGameRefFromRedux,
  getStackInStoreByKey
} from '../redux/reduxUtils';
import {
  getStackRefByKey,
} from './firebase_utils';

const getGame = () => getFirebaseGameRefFromRedux();

export const updateDbWithNertzCall = (numOfPlayerWhoCalledNertz) => {
  const currentGameRef = getGame();
  currentGameRef.child('nertzHasBeenCalled').set(true);
  currentGameRef.child('numOfPlayerWhoCalledNertz').set(numOfPlayerWhoCalledNertz);
}
