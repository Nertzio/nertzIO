
const canThisGoOnThatInSolitaire = (incoming, top) => {
  if (!top) top = {} // if empty stack
  if (top.number) {
    if (incoming.number !== top.number - 1) return false;
  }
  switch (top.suit) {
    case 'club':    return ['diamond', 'heart'].includes(incoming.suit);
    case 'diamond': return ['club',    'spade'].includes(incoming.suit);
    case 'heart':   return ['club',    'spade'].includes(incoming.suit);
    case 'spade':   return ['diamond', 'heart'].includes(incoming.suit);
    default: return true // if empty stack
  }
}

const canThisGoOnThatInFieldStack = (incoming, top) => {
  if (!top) top = { number: 0 } // if empty stack
  if (incoming.number !== top.number + 1) return false;
  return !top.suit || top.suit === incoming.suit;
}

export const canIDropThisOnThatByStackType = (incoming, top, stackType) => {
  switch (stackType) {
    case 'StackSolitaire': return canThisGoOnThatInSolitaire(incoming, top);
    case 'FieldStack': return canThisGoOnThatInFieldStack(incoming, top);
    default: return false;
  }
}

export const thisIsMyCardAndStack = (card, stackKey) => {
  return +stackKey[1] === card.belongsTo;
}
