
const DEFAULT_USER = null;

const SET_CURRENT_USER = 'SET_CURRENT_USER';

export const setCurrentUser = currentUser => ({
  type: SET_CURRENT_USER,
  currentUser
})

export default function UserReducer(user = DEFAULT_USER, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return action.currentUser;
    default:
      return user;
  }
}
