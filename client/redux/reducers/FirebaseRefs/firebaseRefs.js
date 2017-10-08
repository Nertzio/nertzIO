const FIREBASE_REFS = {
  firebase: {},
  game: {},
  stacks: {}
};

const SET_FIREBASE_APP_REF = 'SET_FIREBASE_APP_REF';
const SET_GAME_REF = 'SET_GAME_REF';
const SET_STACK_REF = 'SET_STACK_REF';

export const setFirebaseAppRef = (firebase) => ({
  type: SET_FIREBASE_APP_REF,
  firebase
})

export const setGameRef = (game) => ({
  type: SET_GAME_REF,
  game
})

export const setStackRef = (stackRef) => ({  // {p1BigStack: <fbaseref>}
  type: SET_STACK_REF,
  stackRef
})

const firebaseRefsReducer = (firebaseRefs = FIREBASE_REFS, action) => {
  const {firebase, type, game, stackRef} = action;
  switch (type) {
    case SET_FIREBASE_APP_REF:
      return {...firebaseRefs, firebase}
    case SET_GAME_REF:
      return {...firebaseRefs, game};
    case SET_STACK_REF:
      const stacks = {...firebaseRefs.stacks, ...stackRef};
      return {...firebaseRefs, stacks};
    default:
      return firebaseRefs;
  }
}

export default firebaseRefsReducer;
