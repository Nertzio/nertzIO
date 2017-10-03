const P1_BIG_STACK = [];

const LOAD_P1_BIG_STACK = 'LOAD_P1_BIG_STACK';
const UPDATE_P1_BIG_STACK = 'UPDATE_P1_BIG_STACK';

export const loadP1BigStack = (cards) => ({
  type: LOAD_P1_BIG_STACK,
  cards
})

export const updateP1BigStack = (cards) => ({
  type: UPDATE_P1_BIG_STACK,
  cards
})

const p1BigStackReducer = (p1BigStack = P1_BIG_STACK, action) => {
  const {type, cards} = action;
  switch(type) {

    case LOAD_P1_BIG_STACK:
      return cards;

    case UPDATE_P1_BIG_STACK:
      return cards || P1_BIG_STACK;

    default:
      return p1BigStack;
  }
}

export default p1BigStackReducer;
