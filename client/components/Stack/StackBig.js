import React from 'react'
import {connect} from 'react-redux';
import {Stack} from '../../components';
import {
  getUserPlayerNum,
} from '../../vanillaUtils';
import {
  flip3ForPlayer,
  // restartBigStackForPlayer // being buggy
} from '../../firebase/gameplayUtils';

const StackBig =  ({cards, firebaseRef, playerNum, user, players}) => {

  const faceDownCards = cards.map(card => {
    card.isFaceUp = false;
    return card
  })

  const flip3IfPlayerIsCurrentUser = () => {
    if (players[playerNum].uid === user.uid) return flip3ForPlayer(playerNum);
  }

  return (
    <div
      onClick={() => flip3IfPlayerIsCurrentUser()}
      className="stack-non-solitaire">
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
  players: state.players,
  user: state.user,
})

const connectedStackBig = connect(mapState, null)(StackBig);


export default connectedStackBig;
