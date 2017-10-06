import React from 'react'
import {connect} from 'react-redux';
import {Stack} from '../../components';
import {DropTarget} from 'react-dnd';
import {
  ItemTypes,
  canIDropThisOnThatByStackType
} from '../../DragNDrop';
import {pushCardToStackByPlayer} from '../../firebase/firebase_utils';

const StackSolitaire = ({cards, firebaseRef, connectDropTarget}) => {
  const faceUpCards = cards.map(card => {
    card.isFaceUp = true
    return card
  })

  return connectDropTarget(
    <div style={{
      border: '1px solid gray',
      height: '100%',
      flex: '1 10%'
    }}>
      <Stack cards={faceUpCards} firebaseStackRef={firebaseRef} />
    </div>
  )
}

const solitaireTarget = {
  drop({firebaseRef, cards}, monitor) {
    const cardData = monitor.getItem()
    const numCardsInStack = cards.length;
    firebaseRef.child(numCardsInStack).set(cardData)
  },

  canDrop({cards}, monitor) {
    const incomingCard = monitor.getItem();
    const topCard = cards[cards.length - 1];
    return canIDropThisOnThatByStackType(incomingCard, topCard, 'StackSolitaire');
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

const droppableSolitaireStack = DropTarget(ItemTypes.CARD, solitaireTarget, collect)(StackSolitaire);

export default connect(mapState, null)(droppableSolitaireStack);

