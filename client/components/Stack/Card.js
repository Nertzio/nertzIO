import React from 'react';
import { CardFront, CardBack } from '../Stack';
import { DragSource } from 'react-dnd'
import ItemTypes from '../../DragNDrop/constants';

const Card = (props) => {
  const {
    suit,
    name,
    number,
    isFaceUp,
    belongsTo,
    stackPosition,
    firebaseStackRef
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
      opacity: isDragging ? 0 : 1,
      position: 'absolute',
      top: 0,
      transform: `translate(0px, ${stackPosition * -1}px)`,
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
    isFaceUp,
    belongsTo,
    color,
  }) {
    return { // accessed by DropTargetMonitor.getItem()
      suit,
      name,
      number,
      isFaceUp,
      belongsTo,
      color
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

  canDrag({firebaseStackRef, stackPosition}, monitor){
    return firebaseStackRef.key.slice(2) !== 'BigStack'
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }
}


export default DragSource(ItemTypes.CARD, cardSource, collect)(Card)

