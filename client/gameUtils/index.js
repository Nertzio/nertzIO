import decked from 'decked';

export function shuffleNewDeckForPlayer(playerNum) {
  const deckGenerator = decked( {ace: 'low', jokers: false });
  const baseCards = deckGenerator();
  const gameReadyCards = baseCards.map(card => {
    const gameCardSpecs = {
      belongsTo: playerNum,
      isFaceUp: false,
    }
    return Object.assign({}, card, gameCardSpecs);
  })
  return shuffle(gameReadyCards);
}

export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
