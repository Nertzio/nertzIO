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
