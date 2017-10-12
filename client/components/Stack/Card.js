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
  takeInitials,
} from '../../vanillaUtils';

const Card = (props) => {
  const {
    backgroundColor,
    belongsTo,
    connectDragSource,
    firebaseStackRef,
    isDragging,
    isFaceUp,
    // name,
    // number,
    // ownStack,
    stackPosition,
    players,
    // suit,
   } = props;


   const playerInitials = takeInitials(players[belongsTo].displayName);
   const borderColor = stackPosition % 3 === 0 ? 'lightgray' : 'white'

  return connectDragSource(
    <div
      className="card-wrapper"
      style={{
        border: `1px solid ${borderColor}`,
        opacity: isDragging ? 0 : 1,
        // position: stackPosition ? 'absolute' : 'relative',
        transform: `translate(0px, ${stackPosition * -0.5}px)`,
        // perspective(50em) rotateX(20deg),
        zIndex: stackPosition,
    }}>
      {isFaceUp
        ? <CardFront {...props} />
        : <CardBack initials={playerInitials} color={backgroundColor} />
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
  user: state.user,
  players: state.players,
})

export default connect(mapState)(draggableCards);

