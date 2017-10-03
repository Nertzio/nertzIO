const P1_SOLITAIRE2_STACK = [];

const LOAD_P1_SOLITAIRE2_STACK = 'LOAD_P1_SOLITAIRE2_STACK';
const UPDATE_P1_SOLITAIRE2_STACK = 'UPDATE_P1_SOLITAIRE2_STACK';

export const loadP1Solitaire2Stack = (cards) => ({
  type: LOAD_P1_SOLITAIRE2_STACK,
  cards
})

export const updateP1Solitaire2Stack = (cards) => ({
  type: UPDATE_P1_SOLITAIRE2_STACK,
  cards
})

const p1Solitaire2Reducer = (p1Solitaire2Stack = P1_SOLITAIRE2_STACK, action) => {
  const {type, cards} = action;
  switch(type) {

    case LOAD_P1_SOLITAIRE2_STACK:
      return cards;

    case UPDATE_P1_SOLITAIRE2_STACK:
    return cards || P1_SOLITAIRE2_STACK;

    default:
      return p1Solitaire2Stack;
  }
}

export default p1Solitaire2Reducer;
