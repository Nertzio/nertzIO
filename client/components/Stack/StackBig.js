import React from 'react'
import {connect} from 'react-redux';
import {Stack} from '../../components';
import {
  flip3ForPlayer,
  // restartBigStackForPlayer // being buggy
} from '../../firebase/gameplayUtils';

const StackBig =  ({cards, firebaseRef, playerNum}) => {

  const faceDownCards = cards.map(card => {
    card.isFaceUp = false;
    return card
  })

  return (
    <div
      onClick={() => flip3ForPlayer(playerNum)}
      style={{
        border: '1px solid gray',
        height: '100%',
        flex: '1 10%',
        position: 'relative',
    }}>
      <Stack cards={faceDownCards} firebaseStackRef={firebaseRef} />

      {/* restart button needs to be moved outside the div with the flip3 onClick listener */}
      {/* <div style={{
        bottom: -40,
        left: 0,
        height: 40,
        position: 'absolute',
        width: '100%',
      }}>
        <button onClick={() => restartBigStackForPlayer(playerNum)}>
          Restart
        </button>
      </div> */}
    </div>
  )
}

const mapState = (state, {stackKey}) => ({
  cards: state[stackKey],
  firebaseRef: state.firebaseRefs.stacks[stackKey],
  playerNum: +stackKey[1], // e.g. p1BigStack
})

const connectedStackBig = connect(mapState, null)(StackBig);


export default connectedStackBig;
