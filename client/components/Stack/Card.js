import React from 'react';
import {connect} from 'react-redux';
import { CardFront, CardBack } from '../Stack';
import { DragSource } from 'react-dnd'
import {
  ItemTypes,
  canIDragGivenStackKeyOwnStackAndPosition,
  iOwnThisCard,
} from '../../DragNDrop';
import {
  getUserPlayerNum,
} from '../../vanillaUtils';

const Card = (props) => {
  const {
    // belongsTo,
    // firebaseStackRef,
    isFaceUp,
    // name,
    // number,
    // ownStack,
    stackPosition,
    // suit,
   } = props;

   const { connectDragSource, isDragging } = props
   const borderColor = stackPosition % 2 === 1 ? 'white' : 'lightgray'

  return connectDragSource(
    <div style={{
      border: `1px solid ${borderColor}`,
      borderRadius: '3px',
      height: 'calc(15vh)',
      left: 0,
      margin: '0 auto',
      maxHeight: 'calc(100vw / 5)',
      maxWidth: '100%',
      opacity: isDragging ? 0 : 1,
      position: 'absolute',
      top: 0,
      transform: `translate(0px, ${stackPosition * -1}px) perspective(50em) rotateX(20deg)`,
      width: 'calc(10vh)',
      zIndex: stackPosition,
    }}>
      {isFaceUp
        ? <CardFront {...props} />
        : <CardBack {...props} />
      }
    </div>
  )
}

const cardSource = {
  beginDrag({
    suit,
    name,
    number,
    belongsTo,
    backgroundColor,
    isFaceUp,
    textColor,
    symbol,
    displayName,
  }) {
    return { // accessed by DropTargetMonitor.getItem()
      suit,
      name,
      number,
      belongsTo,
      backgroundColor,
      isFaceUp,
      textColor,
      symbol,
      displayName,
    }
  },

  endDrag({firebaseStackRef, stackPosition}, monitor){
    if (monitor.didDrop()) {
      firebaseStackRef.once('value')
      .then(stackSnapShot => {
        if (stackSnapShot.numChildren() === 1) {
          firebaseStackRef.set(false);
        } else {
          firebaseStackRef.child(stackPosition).remove()
        }
      })
    }
  },

  canDrag({firebaseStackRef, ownStack, stackPosition, user, players}, monitor) {
    const key = firebaseStackRef.key;
    const playerNum = getUserPlayerNum(user, players);
    return (
      iOwnThisCard(playerNum, ownStack[stackPosition])
      && canIDragGivenStackKeyOwnStackAndPosition(key, ownStack, stackPosition)
    )
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }
}


const draggableCards = DragSource(ItemTypes.CARD, cardSource, collect)(Card)

const mapState = state => ({
  user: state.meReducer,
  players: state.players,
})

export default connect(mapState)(draggableCards);

