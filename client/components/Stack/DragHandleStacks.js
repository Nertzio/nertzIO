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
  currentStackPosition,
  isCurrentUser,
  isDragging,
  firebaseStackRef,
}) => {

  const stackPosition = currentStackPosition || 0;
  const currentCard = cards[stackPosition];
  const thereAreMoreCards = stackPosition < cards.length - 1;
  const cssPosition = stackPosition ? 'absolute' : 'relative';
  const shouldDisplay = isCurrentUser ? true : 'none';


  return connectDragPreview( // ALL NESTED COMPONENTS INCLUDED IN DRAG PREVIEW

    <div
      className="draggable-stack"
      style={{
        opacity: isDragging ? 0 : 1,
        position: cssPosition, // 'relative' parent required for stacking'
        zIndex: stackPosition,
    }}>

      {thereAreMoreCards && connectDragSource( // -- START DRAG ANCHOR --
        <div
          className="draggable-stack-anchor"
          style={{
            color: 'white', //currentCard.textColor,
            display: shouldDisplay,
            marginTop: `${8.333 * stackPosition}%`,
            top: `${-30 + (20  * stackPosition)}%`,
        }}>

            <span className="anchor-suit">
              <div className="anchor-suit-flex">
                <span className="anchor-suit-inner">
                  {currentCard.symbol}
                </span>
              </div>
            </span>
            <div className="anchor-num">
                  {currentCard.displayName}
            </div>

        </div> // --------------- END DRAG ANCHOR -------------------
      )}

        <Card
          ownStack={cards}
          stackPosition={stackPosition}
          firebaseStackRef={firebaseStackRef}
          {...currentCard}
        />

        {/* ----------- RECURSIVE DRAG SOURCE COMPONENT ------------*/}
          {/* Every card in this solitiare stack is actually a draggable
              stack, which contains 1) a single card and 2) another draggable
              stack */}
          {/* Stop recursing when no more cards to render */}
        {thereAreMoreCards &&
          <DraggableDragHandleStacks
            {...{isCurrentUser}}
            cards={cards}
            currentStackPosition={stackPosition + 1}
            firebaseStackRef={firebaseStackRef}
          />
        }
    </div>,

    {offsetX: 50}) // makes the preview line up with the mouse better
                    // when dragging.
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
