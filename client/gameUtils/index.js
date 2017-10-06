import decked from 'decked';

export function shuffleNewDeckForPlayer(playerNum) {
  const deckGenerator = decked( {ace: 'low', jokers: false });
  const baseCards = deckGenerator();
  const gameReadyCards = baseCards.map(card => {
    const colors = ['#85144b', '#3D9970', '#0074D9', '#001f3f', '#01FF70', '#FF4136']
    const gameCardSpecs = {
      belongsTo: playerNum,
      color: colors[+playerNum - 1],
      isFaceUp: false,
    }
    return {...card, ...gameCardSpecs};
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
