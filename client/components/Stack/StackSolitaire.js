import React from 'react'
import {connect} from 'react-redux';
import {Stack} from '../../components';
import {DropTarget} from 'react-dnd';
import ItemTypes from '../../DragNDrop/constants';
import {pushCardToStackByPlayer} from '../../firebase/firebase_utils';

const StackSolitaire = ({cards, firebaseRef, connectDropTarget}) => {
  const faceUpCards = cards.map(card => {
    card['isFaceUp'] = true
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

const mapState = (state, {stackKey}) => ({
  cards: state[stackKey],
  firebaseRef: state.firebaseRefs.stacks[stackKey],
})

const droppableSolitaireStack = DropTarget(ItemTypes.CARD, solitaireTarget, collect)(StackSolitaire);
export default connect(mapState, null)(droppableSolitaireStack);



