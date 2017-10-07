import React from 'react'
import Card from './Card'
// import StackDragHandle from './DragHandle';
import { DragSource } from 'react-dnd'
import {
  ItemTypes,
  canIDragGivenStackKeyOwnStackAndPosition,
} from '../../DragNDrop';
import PropTypes from 'prop-types';

const DragHandleStacks = ({
  cards,
  connectDragSource,
  connectDragPreview,
  firebaseStackRef,
  isDragging,
  currentStackPosition,
}) => {

  const stackPosition = currentStackPosition || 0;
  const currentCard = cards[stackPosition];
  const thereAreMoreCards = stackPosition < cards.length - 1;
  const cssPosition = stackPosition ? 'absolute' : 'relative';
  return connectDragPreview(
    <div style={{
      height: 'calc(15vh)',
      margin: '0 auto',
      maxWidth: 'calc(100vw / 10)',
      opacity: isDragging ? 0 : 1,
      position: cssPosition, // 'relative' required for absolute stacking'
      width: 'calc(10vh)',
      zIndex: stackPosition,
    }}>
      {thereAreMoreCards && connectDragSource(
        <div style={{
          backgroundColor: '#E8E8E8',
          color: currentCard.textColor,
          fontSize: '1.5vh',
          height: '8.333%',
          right: '0',
          marginTop: `${8.333 * stackPosition}%`,
          maxWidth: '15vw',
          padding: 3,
          position: 'absolute',
          top: `${8.333  * stackPosition}%`,
          width: '13vh',
        }}>
          {currentCard.displayName}{currentCard.symbol}
        </div>
      )}
      <Card
        ownStack={cards}
        stackPosition={stackPosition}
        firebaseStackRef={firebaseStackRef}
        {...currentCard}
      />

      {thereAreMoreCards &&
        <DraggableDragHandleStacks
          cards={cards}
          currentStackPosition={stackPosition + 1}
          firebaseStackRef={firebaseStackRef}
          // {...{connectDragPreview}}
          // {...{connectDragSource}}
        />
      }
    </div>,
    {offsetX: 50}) // special dragPreview option argument
}


const stackSource = {
  beginDrag({
    cards,
    currentStackPosition,
  }) {
    const draggedStack = cards.slice(currentStackPosition);
    return { // accessed by DropTargetMonitor.getItem()
      draggedStack,
    }
  },

  endDrag({firebaseStackRef, cards}, monitor){
    const {draggedStack} = monitor.getItem();

    console.log('endDrag draggedStack: ', draggedStack);
    const remainingCards = cards.slice(0, -draggedStack.length )
    // const cutoff = cards.length - draggedStack.length;
    const isAllCards = remainingCards.length === 0;

    if (monitor.didDrop()) {
      if (isAllCards) {
        console.log(firebaseStackRef.key, 'set to false');
        firebaseStackRef.set(false).catch(console.error.bind(console));
      } else {
        firebaseStackRef
          .set(remainingCards)
          .catch(console.error.bind(console));
      }
    }
  },

  canDrag({cards, currentStackPosition}, monitor) {
    const key = 'DragHandleStack';
    return canIDragGivenStackKeyOwnStackAndPosition(key, cards, currentStackPosition)
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }
}


const DraggableDragHandleStacks = DragSource(ItemTypes.STACK, stackSource, collect)(DragHandleStacks)

export default DraggableDragHandleStacks;
