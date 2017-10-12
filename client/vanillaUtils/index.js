import {
  getCurrentUserInRedux,
  playerNumWhoCalledNertzInRedux,
  getPlayersInStore,
  getStackInStoreByKey,
} from '../redux/reduxUtils';


export const checkIfUserIsAmongPlayers = players => {
  if (!players) return false;
  if (!Array.isArray(players) && typeof players === 'object') {
    players = Object.values(players);
  }
  const currentUser = getCurrentUserInRedux();
  return players.some(({uid}) => uid === currentUser.uid);
}

export const getUserPlayerNum = (user, players) => {
  if (Array.isArray(players)) {
    return players.findIndex(player => player.uid === user.uid) + 1;

  } else if (typeof players === 'object') {
    for (let key in players) {
      if (players[key].uid === user.uid) return +key;
    }
  } else {
    throw new TypeError(`getUserPlayerNum() accepts players as an array or an \n object, but you passed an ${Object.getPrototypeOf(players)}`)
  }
}

export const findCurrentUserInPlayers = (user, players) => {
  if (Array.isArray(players)) {
    return players[getUserPlayerNum(user, players) - 1]
  } else if (typeof players === 'object') {
    return players[getUserPlayerNum(user, players)];
  } else {
    throw new TypeError(`findCurrentUserInPlayers() accepts players as an array or an object, but you passed an ${Object.getPrototypeOf(players)}`)
  }
}

export const thereAreNo = (collection) => {
  if (Array.isArray(collection)) return collection.length === 0;
  if (typeof collection === 'object') {
    return Object.keys(collection).length === 0;
  }
}

export const takeInitials = (nameStr) => (
  nameStr.split(' ').map(name => name[0].toUpperCase()).join('')
)

export const tallyScoreForAllPlayers = () => {
  const playerObjs = getPlayersInStore()
  const playerNums = Object.keys(playerObjs)

  const fieldCards = []
  let fieldStackNum = playerNums.length * 4
  while (fieldStackNum) {
   fieldCards.push(...getStackInStoreByKey(`fieldStack${fieldStackNum}`));
    fieldStackNum -= 1
  }
  const playerScores = {}
  playerNums.forEach(playerNum => {
    playerScores[playerNum] = 0
    playerScores[playerNum] += fieldCards.filter(card => {
      return +card.belongsTo === +playerNum
    }).length
    playerScores[playerNum] -= getStackInStoreByKey(`p${playerNum}LittleStack`).length * 2
  })
  playerScores[playerNumWhoCalledNertzInRedux()] += 10;

  return playerScores;
}
