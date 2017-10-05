function generatePlayerStackReducer(playerKey, stackName) {
  const DEFAULT_PLAYER_STACK = [];

  const UPDATE_PLAYER_STACK = `UPDATE_P${playerKey}${stackName.toUpperCase()}`;

  const playerStackReducer = (playerStack = DEFAULT_PLAYER_STACK, action) => {
    const { type, stack } = action;
    switch (type) {
      case UPDATE_PLAYER_STACK:
        return stack || DEFAULT_PLAYER_STACK;
      default:
        return playerStack;
    }
  }
  return playerStackReducer;
}

function createStackReducersForNPlayers (num) {
  const stackNames = [
    'BigStack',
    'LittleStack',
    'DrawnStack',
    'SolitaireStack1',
    'SolitaireStack2',
    'SolitaireStack3',
    'SolitaireStack4',
  ];
  const reducers = {};
  for (let i = 1; i <= num; i++) {
    stackNames.forEach(stackName => {
      reducers[`p${i}${stackName}`] = generatePlayerStackReducer(i, stackName);
    })
  }
  return reducers;
}

export const updatePlayerStackByKey = (stackKey, stack) => ({
  type: `UPDATE_${stackKey.toUpperCase()}`,
  stack,
});

export default createStackReducersForNPlayers;
