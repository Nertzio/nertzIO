import React from 'react'
import {connect} from 'react-redux';
import {Stack} from '../../components';

const StackDrawn =  ({cards, firebaseRef}) => {

  const faceUpCards = cards.map(card => {
    card.isFaceUp = true
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

const connectedStackDrawn = connect(mapState, null)(StackDrawn);

export default connectedStackDrawn;
