
const iAmNotInBigStack = stackKey => stackKey.slice(2) !== 'BigStack';

const iAmTopCard = (ownStack, stackPosition) => stackPosition === ownStack.length - 1;

export const canIDragGivenStackKeyOwnStackAndPosition = (
  stackKey,
  ownStack,
  stackPosition
) => {
  return iAmNotInBigStack(stackKey)
        && iAmTopCard(ownStack, stackPosition)
}
