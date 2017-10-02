const P1_DRAWN_STACK = [];

const LOAD_P1_DRAWN_STACK = 'LOAD_P1_DRAWN_STACK';
const UPDATE_P1_DRAWN_STACK = 'UPDATE_P1_DRAWN_STACK';

export const loadP1DrawnStack = (cards) => ({
  type: LOAD_P1_DRAWN_STACK,
  cards
})

export const updateP1DrawnStack = (cards) => ({
  type: UPDATE_P1_DRAWN_STACK,
  cards
})

const p1DrawnStackReducer = (p1DrawnStack = P1_DRAWN_STACK, action) => {
  const {type, cards} = action;
  switch(type) {

    case LOAD_P1_DRAWN_STACK:
      return cards;

    case UPDATE_P1_DRAWN_STACK:
      return cards;

    default:
      return p1DrawnStack;
  }
}

export default p1DrawnStackReducer;
