import React from 'react'
import {connect} from 'react-redux';
import {Stack} from '../../components';

const StackDrawn =  ({cards, firebaseRef}) => {

  const faceUpCards = cards.map(card => {
    card.isFaceUp = true
    return card
  })


  return (
    <div style={{
      border: '1px solid gray',
      height: '100%',
      flex: '1 10%'
    }}>
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
