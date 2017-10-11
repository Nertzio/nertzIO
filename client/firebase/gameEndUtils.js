import {
  getFirebaseGameRefFromRedux
} from '../redux/reduxUtils';
import {tallyScoreForAllPlayers} from '../vanillaUtils'

const getGame = () => getFirebaseGameRefFromRedux();

export const updateDbWithNertzCall = (numOfPlayerWhoCalledNertz) => {
  const currentGameRef = getGame();
  currentGameRef.child('nertzHasBeenCalled').set(true);
  currentGameRef.child('numOfPlayerWhoCalledNertz').set(numOfPlayerWhoCalledNertz);
}

export const updateDbWithPlayerScores = () => {
  const currentGameRef = getGame();
  const playerScores = tallyScoreForAllPlayers();
  const playerNums = Object.keys(playerScores)
  playerNums.forEach(playerNum => {
    currentGameRef.child(playerNum).update({
        score: playerScores[playerNum]
    })
  })
}
