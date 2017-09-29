import axios from 'axios'
import history from '../history'
import firebase from 'firebase'
import secrets from '../../secrets'
firebase.initializeApp(secrets.firebaseConfig);
const database = firebase.database()
import firebaseInit from '../../REFERENCE';

/**
 * ACTION TYPES
 */
const ADJUST_USER = 'ADJUST_USER'
const GET_USERS = 'GET_USERS'

/**
 * INITIAL STATE
 */
const defaultUsers = {}

/**
 * ACTION CREATORS
 */
const adjustUser = (users) => ({type: ADJUST_USER, users})
const getUsers = (users) => ({type: GET_USERS, users})

/**
 * THUNK CREATORS
 */
export const fetchUsers = () =>
  dispatch => {
    const users = database.ref('users/');
    users.once('value')
    .then(fetchedUsers => dispatch(getUsers(fetchedUsers.val())))
    .catch(err => console.error(err))
  }


export const updateUserScore = (user) =>
  () => {
    const thunkScore = user.score + 1
    database.ref(/* `/users/${user.id}` */).update(firebaseInit/* {
      score: thunkScore
    } */)
    .then(() => console.log('user updated in firebase'))
    .catch((err) => console.error(err))
  }

  /**
 * FUNKY THUNKS
 */

  export const updateReduxUsersUponDbUpdates = () => (
    dispatch => {
      database.ref('users/').on('value', function(snapshot) {
        dispatch(adjustUser(snapshot.val()))
      });
    }
  )


/**
 * REDUCER
 */
export default function (state = defaultUsers, action) {
  switch (action.type) {
    case GET_USERS:
      return action.users
    case ADJUST_USER:
      return action.users
    default:
      return state
  }
}
