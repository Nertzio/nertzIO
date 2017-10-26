import React from 'react';
import { DragSource } from 'react-dnd'
import Card from './Card';
import {removeFromStackAtPosition} from '../../firebase/gameplayUtils';
import {
  ItemTypes,
  canIDragGivenStackKeyOwnStackAndPosition,
  iOwnThisCard,
} from '../../DragNDrop';


const DragCard = (props) => {
  return props.connectDragSource(<div><Card {...props}  /></div>)
}

const cardSource = {
  // this defines the data to be passed to DropTargetMonitor.getItem()
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
    return {
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

  // fires any time drag action ends, regardless of if dropped on target
  endDrag({firebaseStackRef, stackPosition}, monitor){
    // checks if successfully dropped on a valid target
    if (monitor.didDrop()) {
      removeFromStackAtPosition(firebaseStackRef, stackPosition);
    }
  },

  // validates the conditions under which item can be dragged
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

// connect provides HTML5 DnD methods to inject into props
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }
}

export default DragSource(ItemTypes.CARD, cardSource, collect)(DragCard)

