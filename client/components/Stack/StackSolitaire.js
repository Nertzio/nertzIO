import React from 'react'
import {connect} from 'react-redux';
import {Stack, DragHandleStacks} from '../../components';
import {DropTarget} from 'react-dnd';
import {
  ItemTypes,
  canIDropThisOnThatByStackType
} from '../../DragNDrop';

const StackSolitaire = ({cards, firebaseRef, connectDropTarget, stackKey}) => {
  const faceUpCards = cards.map(card => {
    card.isFaceUp = true
    return card
  })
  console.log('STACK SOLITAIRE STACK KEY=', stackKey); //SARA
  return connectDropTarget(
    <div style={{
      border: '1px solid gray',
      height: '100%',
      flex: '1 10%'
    }}>
      {cards.length > 0 &&
        <DragHandleStacks cards={faceUpCards} firebaseStackRef={firebaseRef} />
      }
    </div>
  )
}

const solitaireTarget = { // TODO: extract this into firebase utils
  drop({firebaseRef, cards}, monitor) {
    const DropType = monitor.getItemType();
    const payload = monitor.getItem()
    if (DropType === 'card') {
      const numCardsInStack = cards.length;
      firebaseRef.child(numCardsInStack).set(payload)
        .catch(console.error.bind(console));
    } else if (DropType === 'stack') { // TODO: extract this into firebase utils
      const {draggedStack} = payload;
      const start = cards.length;
      const cardNode = {}
      for (let i = 0; i < draggedStack.length; i++) {
        cardNode[start + i] = draggedStack[i];
      }
      firebaseRef.update(cardNode)
        .catch(console.error.bind(console));
    }

  },

  canDrop({cards}, monitor) {
    const DropType = monitor.getItemType();
    const payload = monitor.getItem();
    const targetTopCard = cards[cards.length - 1];
    if (DropType === 'stack') {
      const {draggedStack} = payload;
      // just validate bottom card of incoming stack
      return canIDropThisOnThatByStackType(draggedStack[0], targetTopCard, 'StackSolitaire');
    } else if (DropType === 'card') {
      return canIDropThisOnThatByStackType(payload, targetTopCard, 'StackSolitaire');
    }
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

const droppableSolitaireStack = DropTarget([ItemTypes.CARD, ItemTypes.STACK], solitaireTarget, collect)(StackSolitaire);

export default connect(mapState, null)(droppableSolitaireStack);

