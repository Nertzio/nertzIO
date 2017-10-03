import React from 'react'
import {connect} from 'react-redux';
import {Stack} from '../../components';
import PropTypes from 'prop-types';
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
    console.log("Dropped per Target!")
    // TODO: get the data from dropped card (monitor.getItem())
    // and tell firebase to push this card onto the designated stack
    const cardData = monitor.getItem()
    firebaseRef.once("value")
    .then(snapshot => {
      const numCardsInStack = snapshot.numChildren()
      // firebaseRef.push({[numCardsInStack]: cardData})
      firebaseRef.child(numCardsInStack).set(cardData)
      console.log("No, really, DROPPED (pushed to stack)!")
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

// const connectedSolitaireStack = connect(mapState, null)(StackSolitaire);

// export default DropTarget(ItemTypes.CARD, solitaireTarget, collect)(connectedSolitaireStack);

const droppableSolitaireStack = DropTarget(ItemTypes.CARD, solitaireTarget, collect)(StackSolitaire);
export default connect(mapState, null)(droppableSolitaireStack);



