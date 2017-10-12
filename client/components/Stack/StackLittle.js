import React from 'react'
import {connect} from 'react-redux';
import {Stack} from '../../components';

const StackLittle =  ({cards, firebaseRef}) => {
  //if (!cards.length) alert("Game Over = Player 13-card deck empty")
  //TODO: Add logic to trigger end game actions OR give player the option to call 'Nertz!' which will trigger end game (e.g. disable game play actions, tally scores, report results) when any player 13-card stack is empty. (This should not be enabled until game has fully loaded.)

  const faceUpCards = cards.map(card => {
    card['isFaceUp'] = true
    return card
  })

  return (
    <div className="stack-non-solitaire">
      <Stack cards={faceUpCards} firebaseStackRef={firebaseRef}/>
    </div>
  )
}

const mapState = (state, {stackKey}) => ({
  cards: state[stackKey],
  firebaseRef: state.firebaseRefs.stacks[stackKey],
})

const connectedStackLittle = connect(mapState, null)(StackLittle);

export default connectedStackLittle;
