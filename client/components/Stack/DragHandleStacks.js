import React from 'react'
import Card from './Card'
import { DragSource } from 'react-dnd'
import {
  ItemTypes,
  canIDragGivenStackKeyOwnStackAndPosition,
} from '../../DragNDrop';


// This component creates stacks of stacks by recursively calling its DragNDrop enhanced form (at bottom). Each recursive call to DraggableDragHandleStacks creates a draggable component contained within the draggable parent component, so that when a parent component is dragged, its children are dragged and included in the drag preview too.


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


  return connectDragPreview( // ALL NESTED COMPONENTS INCLUDED IN DRAG PREVIEW
    <div style={{
      height: 'calc(15vh)',
      margin: '0 auto',
      maxWidth: 'calc(100vw / 10)',
      opacity: isDragging ? 0 : 1,
      position: cssPosition, // 'relative' required for absolute stacking'
      width: 'calc(10vh)',
      zIndex: stackPosition,
    }}>

      {thereAreMoreCards && connectDragSource( // -- START DRAG ANCHOR --
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
        </div> // --------------- END DRAG ANCHOR -------------------
      )}

      <Card
        ownStack={cards}
        stackPosition={stackPosition}
        firebaseStackRef={firebaseStackRef}
        {...currentCard}
      />

      {/* ----------- RECURSIVE DRAG SOURCE COMPONENT ------------*/}
        {/* Every card in this solitiare stack renders as a draggable stack which contains other draggable stacks as its children  */}
        {/* Stop recursing when no more cards to render */}
      {thereAreMoreCards &&
        <DraggableDragHandleStacks
          cards={cards}
          currentStackPosition={stackPosition + 1}
          firebaseStackRef={firebaseStackRef}
        />
      }
    </div>,

    {offsetX: 50}) // special dragPreview option argument
}

// ------------------- DRAG N DROP STUFF ------------------------

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

    const remainingCards = cards.slice(0, -draggedStack.length )
    // const cutoff = cards.length - draggedStack.length;
    const isAllCards = remainingCards.length === 0;

    if (monitor.didDrop()) {
      if (isAllCards) {
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
