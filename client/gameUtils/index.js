import decked from 'decked';
import store from '../redux';

const suits = ['heart', 'diamond', 'spade', 'club']
const symbols = ['♥️', '♦️', '♠️', '♣️']
const colors = ['#85144b', '#3D9970', '#0074D9', '#001f3f', '#01FF70', '#FF4136']

const generateGameReadyCardsForPlayer = (playerNum, cards) => {
  return cards.map(card => {
    const {suit, name} = card;
    const textColor = ['spade', 'club'].includes(suit) ? 'black' : 'red';
    const symbol = symbols[suits.indexOf(suit)]
    const cardName = name.toString();
    const displayName = cardName.length > 2 ?
      cardName[0].toUpperCase() :
      cardName;
    const gameCardSpecs = {
      belongsTo: playerNum,
      backgroundColor: colors[+playerNum - 1],
      isFaceUp: false,
      textColor,
      symbol,
      displayName,
    }
    return {...card, ...gameCardSpecs};
  })
}


export const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const shuffleNewDeckForPlayer = (playerNum) => {
  const deckGenerator = decked( {ace: 'low', jokers: false });
  const baseCards = deckGenerator();
  const gameReadyCards = generateGameReadyCardsForPlayer(playerNum, baseCards);
  return shuffle(gameReadyCards);
}

export const calculatePlayerScores = () => {
  const scores = {};
  const fieldStacks = [];
  const state = store.getState();
  for (let key in state) {
    if (key.includes('field')) fieldStacks.push(state[key]);
  }
  fieldStacks.forEach(stack => {
    stack.forEach(({belongsTo}) => (
      scores[belongsTo] = scores[belongsTo]
        ? scores[belongsTo] + 1
        : 1
    ))
  })
}

