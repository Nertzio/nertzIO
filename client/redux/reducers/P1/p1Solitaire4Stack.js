const P1_SOLITAIRE4_STACK = [];

const LOAD_P1_SOLITAIRE4_STACK = 'LOAD_P1_SOLITAIRE4_STACK';
const UPDATE_P1_SOLITAIRE4_STACK = 'UPDATE_P1_SOLITAIRE4_STACK';

export const loadP1Solitaire4Stack = (cards) => ({
  type: LOAD_P1_SOLITAIRE4_STACK,
  cards
})

export const updateP1Solitaire4Stack = (cards) => ({
  type: UPDATE_P1_SOLITAIRE4_STACK,
  cards
})

const p1Solitaire4Reducer = (p1Solitaire4Stack = P1_SOLITAIRE4_STACK, action) => {
  const {type, cards} = action;
  switch(type) {

    case LOAD_P1_SOLITAIRE4_STACK:
      return cards;

    case UPDATE_P1_SOLITAIRE4_STACK:
    return cards || P1_SOLITAIRE4_STACK;

    default:
      return p1Solitaire4Stack;
  }
}

export default p1Solitaire4Reducer;
