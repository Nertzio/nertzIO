import React from 'react';
import { DragSource } from 'react-dnd'
import Card from './Card';
import {
  ItemTypes,
  canIDragGivenStackKeyOwnStackAndPosition,
  iOwnThisCard,
} from '../../DragNDrop';


const DragCard = (props) => {
  return props.connectDragSource(<div><Card {...props}  /></div>)
}

const cardSource = {
  beginDrag(props) {
    const {
      backgroundColor,
      belongsTo,
      displayName,
      isFaceUp,
      name,
      number,
      suit,
      symbol,
      textColor,
    } = props;
    return { // accessed by DropTargetMonitor.getItem()
      backgroundColor,
      belongsTo,
      displayName,
      isFaceUp,
      name,
      number,
      suit,
      symbol,
      textColor,
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

  canDrag(props) {
    const {
      firebaseStackRef,
      ownStack,
      stackPosition,
      userPlayerNum,
    } = props;
    const key = firebaseStackRef.key;

    return (
      iOwnThisCard(userPlayerNum, ownStack[stackPosition])
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

export default DragSource(ItemTypes.CARD, cardSource, collect)(DragCard)

