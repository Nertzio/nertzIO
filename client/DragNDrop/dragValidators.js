const iAmNotAFieldStack = stackKey => stackKey.slice(0, 10) !== 'fieldStack'

const iAmNotInBigStack = stackKey => stackKey.slice(2) !== 'BigStack';

const iAmTopCard = (ownStack, stackPosition) => stackPosition === ownStack.length - 1;

const iAmADraggableStack = (stackKey) => {
  return stackKey === 'DragHandleStack'
}

export const iOwnThisCard = (playerNum, card) => {
  return +playerNum === +card.belongsTo;
}

export const canIDragGivenStackKeyOwnStackAndPosition = (
  stackKey,
  ownStack,
  stackPosition
) => {
  return iAmNotInBigStack(stackKey) && iAmNotAFieldStack(stackKey)
    && ( iAmTopCard(ownStack, stackPosition) || iAmADraggableStack(stackKey) )
}

