
const canThisGoOnThatInSolitaire = (incoming, top) => {

  if (incoming.number !== top.number + 1) return false;
  switch (top.suit) {
    case 'club':    return ['diamond', 'heart'].includes(incoming.suit);
    case 'diamond': return ['club',    'spade'].includes(incoming.suit);
    case 'heart':   return ['club',    'spade'].includes(incoming.suit);
    case 'spade':   return ['diamond', 'heart'].includes(incoming.suit);
    default: return true // if empty stack
  }
}

const canThisGoOnThatInFieldStack = (incoming, top) => {
  if (incoming.numer !== top.number + 1) return false;
  if (top && top.suit )
  switch (top.suit)
}

export const canIDropThisOnThatByStackType = (incoming, top, stackType) => {
  if (!top) top = { number: 0 } // if empty stack
  switch (stackType) {
    case 'StackSolitaire': return canThisGoOnThatInSolitaire(incoming, top);
    case 'FieldStack': return canThisGoOnThatInFieldStack
    default: return 4;
  }
}
