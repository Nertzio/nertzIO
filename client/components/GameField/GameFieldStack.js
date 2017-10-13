import React from 'react';
import {connect} from 'react-redux';
import {Stack} from '../Stack';
import {DropTarget} from 'react-dnd';
import {
  ItemTypes,
  canIDropThisOnThatByStackType,
} from '../../DragNDrop';
import {pushCardToStackByPlayer} from '../../firebase/firebase_utils';

function GameFieldStack(props) {
  const {cards, firebaseRef, connectDropTarget} = props;

  const faceUpCards = cards.map(card => {
    card.isFaceUp = true
    return card
  })

  return connectDropTarget(
    <div className="game-field-stack">
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
  },

  canDrop({cards}, monitor) {
    const incomingCard = monitor.getItem();
    const topCard = cards[cards.length - 1];
    return canIDropThisOnThatByStackType(incomingCard, topCard, 'FieldStack');
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    // canDrop: monitor.canDrop(),
  }
}

const mapState = (state, {stackKey}) => ({
  cards: state[stackKey],
  firebaseRef: state.firebaseRefs.stacks[stackKey],
})

const droppableFieldStack = DropTarget(ItemTypes.CARD, fieldStackTarget, collect)(GameFieldStack);

export default connect(mapState, null)(droppableFieldStack);

