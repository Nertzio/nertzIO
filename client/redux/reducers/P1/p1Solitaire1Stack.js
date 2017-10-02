const P1_SOLITAIRE1_STACK = [];

const LOAD_P1_SOLITAIRE1_STACK = 'LOAD_P1_SOLITAIRE1_STACK';
const UPDATE_P1_SOLITAIRE1_STACK = 'UPDATE_P1_SOLITAIRE1_STACK';

export const loadP1Solitaire1Stack = (cards) => ({
  type: LOAD_P1_SOLITAIRE1_STACK,
  cards
})

export const updateP1Solitaire1Stack = (cards) => ({
  type: UPDATE_P1_SOLITAIRE1_STACK,
  cards
})

const p1Solitaire1Reducer = (p1Solitaire1Stack = P1_SOLITAIRE1_STACK, action) => {
  const {type, cards} = action;
  switch(type) {

    case LOAD_P1_SOLITAIRE1_STACK:
      return cards;

    case UPDATE_P1_SOLITAIRE1_STACK:
      return cards;

    default:
      return p1Solitaire1Stack;
  }
}

export default p1Solitaire1Reducer;
