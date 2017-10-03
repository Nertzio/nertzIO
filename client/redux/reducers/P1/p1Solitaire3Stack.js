const P1_SOLITAIRE3_STACK = [];

const LOAD_P1_SOLITAIRE3_STACK = 'LOAD_P1_SOLITAIRE3_STACK';
const UPDATE_P1_SOLITAIRE3_STACK = 'UPDATE_P1_SOLITAIRE3_STACK';

export const loadP1Solitaire3Stack = (cards) => ({
  type: LOAD_P1_SOLITAIRE3_STACK,
  cards
})

export const updateP1Solitaire3Stack = (cards) => ({
  type: UPDATE_P1_SOLITAIRE3_STACK,
  cards
})

const p1Solitaire3Reducer = (p1Solitaire3Stack = P1_SOLITAIRE3_STACK, action) => {
  const {type, cards} = action;
  switch(type) {

    case LOAD_P1_SOLITAIRE3_STACK:
      return cards;

    case UPDATE_P1_SOLITAIRE3_STACK:
      return cards || P1_SOLITAIRE3_STACK;

    default:
      return p1Solitaire3Stack;
  }
}

export default p1Solitaire3Reducer;
