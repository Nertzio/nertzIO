export const updateFieldStackByKey = (stackKey, stack) => ({
  type: `UPDATE_${stackKey.toUpperCase()}`,
  stack,
});

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

function createNFieldStackReducers (n) {
  const reducers = {};
  for (let i = 1; i <= n; i++) {
    reducers[`fieldStack${i}`] = generateDynamicFieldStackReducerByKey(i);
  }
  return reducers;
}

export default createNFieldStackReducers;
