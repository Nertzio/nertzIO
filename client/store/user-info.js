import axios from 'axios'
import history from '../history'
import firebase from 'firebase'
const database = firebase.database()


/**
 * ACTION TYPES
 */
const CHANGE_SCORE = 'CHANGE_SCORE'
const GET_USERS = 'GET_USERS'

/**
 * INITIAL STATE
 */
const defaultUsers = {}

/**
 * ACTION CREATORS
 */
const changeScore = (user) => ({type: CHANGE_SCORE, user})
const getUsers = (users) => ({type: GET_USERS, users})

/**
 * THUNK CREATORS
 */
const fetchUsers = () =>
  dispatch => {
    const users = database.ref('users/');
    users.once('value')
    .then(fetchedUsers => dispatch(getUsers(fetchedUsers.val())))
    .catch(err => console.error(err))
  }


const updateScore = (user) =>
  dispatch => {
    const thunkScore = user.score + 1
    database.ref('/users/15').update({
      score: thunkScore
    })
  }


/**
 * REDUCER
 */
export default function (state = defaultUsers, action) {
  switch (action.type) {
    case GET_USERS:
      return action.users
    case CHANGE_SCORE:
      return action.user
    default:
      return state
  }
}
