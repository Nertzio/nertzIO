const P1_LITTLE_STACK = [];

const LOAD_P1_LITTLE_STACK = 'LOAD_P1_LITTLE_STACK';
const UPDATE_P1_LITTLE_STACK = 'UPDATE_P1_LITTLE_STACK';

export const loadP1LittleStack = (cards) => ({
  type: LOAD_P1_LITTLE_STACK,
  cards
})

export const updateP1LittleStack = (cards) => ({
  type: UPDATE_P1_LITTLE_STACK,
  cards
})

const p1LittleStackReducer = (p1LittleStack = P1_LITTLE_STACK, action) => {
  const {type, cards} = action;
  switch(type) {

    case LOAD_P1_LITTLE_STACK:
      return cards;

    case UPDATE_P1_LITTLE_STACK:
      return cards;

    default:
      return p1LittleStack;
  }
}

export default p1LittleStackReducer;
