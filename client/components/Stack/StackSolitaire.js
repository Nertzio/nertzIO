import React from 'react'
import {connect} from 'react-redux';
import {Stack, DragHandleStacks} from '../../components';
import {DropTarget} from 'react-dnd';
import {
  ItemTypes,
  canIDropThisOnThatByStackType,
  thisIsMyCardAndStack,
} from '../../DragNDrop';

const StackSolitaire = ({
  cards,
  firebaseRef,
  connectDropTarget,
  isCurrentUser,
  stackKey
}) => {

  let faceUpCards
  if (cards){
    faceUpCards = cards.map(card => {
    card.isFaceUp = true
    return card;
  })}
  return connectDropTarget(
    <div className="stack-solitaire-drop-target">
       <div className="draggable-stack">
        {cards && cards.length > 0 &&
          <DragHandleStacks
            {...{isCurrentUser}}
            cards={faceUpCards}
            firebaseStackRef={firebaseRef}
          />
        }
      </div>
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

  canDrop({cards, stackKey}, monitor) {
    const DropType = monitor.getItemType();
    const payload = monitor.getItem();
    const targetTopCard = cards[cards.length - 1];
    if (DropType === 'stack') {
      const {draggedStack} = payload;
      // just validate bottom card of incoming stack
      if (!thisIsMyCardAndStack(draggedStack[0], stackKey)) return false;
      return canIDropThisOnThatByStackType(draggedStack[0], targetTopCard, 'StackSolitaire');
    } else if (DropType === 'card') {
      if (!thisIsMyCardAndStack(payload, stackKey)) return false;
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

