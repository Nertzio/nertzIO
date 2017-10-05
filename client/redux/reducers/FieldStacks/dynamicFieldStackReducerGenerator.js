/* this is an unusual pattern so I'll explain what's going on:
  games have indeterminate numbers of field stacks on the game field, depending on the number of people playing. 2 players should have 8 field stacks, 3 should have 12 stacks, and so on.

  What this generateDynamicFieldStackReducerByKey function does is take a "key" (which is currently just a number) to create a redux action and reducer. It returns the reducer function, which has closure over action type.

*/
function generateDynamicFieldStackReducerByKey(key) {
  const DEFAULT_FIELD_STACK = [];

  const UPDATE_FIELDSTACK = `UPDATE_FIELDSTACK${key}`;

  const fieldStackReducer = (fieldStack = DEFAULT_FIELD_STACK, action) => {
    const { type, stack } = action;
    switch (type) {
      case UPDATE_FIELDSTACK:
        return stack || DEFAULT_FIELD_STACK;
      default:
        return fieldStack;
    }
  }
  return fieldStackReducer;
}

/*
  The unique reducer is then assigned to a key on a reducers object in the createNFieldStackReducers function. Its key on the reducers object matches the fieldStack's key in firebase (e.g. 'fieldStack1', 'fieldStack2', etc).

  The reducers object return by createNFieldStackReducers will end up looking like this:

  {
    fieldStack1: uniqueReducerForFieldStack1,
    fieldStack2: uniqueReducerForFieldStack2,
    fieldStack3: uniqueReducerForFieldStack3,
    ...etc
  }

*/

function createNFieldStackReducers (n) {
  const reducers = {};
  for (let i = 1; i <= n; i++) {
    reducers[`fieldStack${i}`] = generateDynamicFieldStackReducerByKey(i);
  }
  return reducers;
}

/*
  createNFieldStackReducers is called in the redux index.js file inside of the object passed to the combineReducers function. The reducers object returned from createNFieldStackReducers is then spread (...) onto the object passed to combineReducers. This creates the desired effect of dynamically generating an indeterminate number of unique fieldStack reducers onto our store so that we can easily connect our fieldStack component to the store and make use of a mapState = state => ({ cards: state.fieldStack14 }). Not to mention this avoids having to write the same reducer file at least 16 times.

  The updateFieldStackByKey function is a special action creator designed to receive a fieldStack key from firebase (e.g. 'fieldStack4') and thus create the correct action type to update the correct slice of the redux store.
*/

export const updateFieldStackByKey = (stackKey, stack) => ({
  type: `UPDATE_${stackKey.toUpperCase()}`,
  stack,
});

export default createNFieldStackReducers;
