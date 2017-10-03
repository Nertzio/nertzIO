const FIREBASE_REFS = {
  game: {},
  stacks: {}
};

const SET_GAME_REF = 'SET_GAME_REF';
const SET_STACK_REF = 'SET_STACK_REF';

export const setGameRef = (game) => ({
  type: SET_GAME_REF,
  game
})

export const setStackRef = (stackRef) => ({  // {p1BigStack: <fbaseref>}
  type: SET_STACK_REF,
  stackRef
})

const gameReducer = (firebaseRefs = FIREBASE_REFS, action) => {
  const {type, game, stackRef} = action;
  switch (type) {
    case SET_GAME_REF:
      return {...firebaseRefs, game};
    case SET_STACK_REF:
      const stacks = Object.assign({}, firebaseRefs.stacks, stackRef)
      return {...firebaseRefs, stacks};
    default:
      return firebaseRefs;
  }
}

export default gameReducer;
