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

  return connectDragSource(
    <div style={{
      opacity: isDragging ? 0.5 : 1,
      border: '1px gray solid',
      position: 'absolute',
      height: '100%',
      margin: '0 auto',
      transform: `translate(0px, ${stackPosition * 1}px)`,
      width: '80%',
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
  }) {
    return { // accessed by DropTargetMonitor.getItem()
      suit,
      name,
      number,
      isFaceUp,
      belongsTo,
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

