

/**
 * ACTION TYPES
 */
const ADD_LOCAL_USER_INFO = 'ADD_LOCAL_USER_INFO'
const REMOVE_LOCAL_USER = 'REMOVE_LOCAL_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
export const addLocalUserInfo = (userInfo) => {
  let user = {};
  user.displayName = userInfo.displayName;
  user.email = userInfo.email;
  user.uid = userInfo.uid;
  return ({type: ADD_LOCAL_USER_INFO, user});
}

export const removeLocalUser = () => {
  return ({type: REMOVE_LOCAL_USER});
}

/**
 * REDUCER
 */
export default function userReducer (state = defaultUser, action) {
  switch (action.type) {
    case ADD_LOCAL_USER_INFO:
      return action.user
    case REMOVE_LOCAL_USER:
      return defaultUser;
    default:
      return state
  }
}
