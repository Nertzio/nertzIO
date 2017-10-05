import React from 'react';
import {connect} from 'react-redux';
import {Stack} from '../Stack';
import {DropTarget} from 'react-dnd';
import ItemTypes from '../../DragNDrop/constants';
import {pushCardToStackByPlayer} from '../../firebase/firebase_utils';

function GameFieldStack(props) {
  const {cards, firebaseRef, connectDropTarget} = props;

  const faceUpCards = cards.map(card => {
    card.isFaceUp = true
    return card
  })

  return connectDropTarget(
    <div style={{
      backgroundColor: 'black',
      border: '1px solid gray', // TODO: remove later
      color: 'white',
      display: 'flex',
      flexGrow: 1,
      height: '100%',
      width: '100%',
    }}>
      <Stack cards={faceUpCards} firebaseStackRef={firebaseRef}  />
    </div>
  )
}

const fieldStackTarget = {
  drop({firebaseRef}, monitor) {
    const cardData = monitor.getItem()
    firebaseRef.once("value")
    .then(snapshot => {
      const numCardsInStack = snapshot.numChildren()
      firebaseRef.child(numCardsInStack).set(cardData)
    })
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    // canDrop: monitor.canDrop(),
  }
}

// export default GameFieldStack;

const mapState = (state, {stackKey}) => ({
  cards: state[stackKey],
  firebaseRef: state.firebaseRefs.stacks[stackKey], //TODO: add to redux
})

const droppableFieldStack = DropTarget(ItemTypes.CARD, fieldStackTarget, collect)(GameFieldStack);

export default connect(mapState, null)(droppableFieldStack);

