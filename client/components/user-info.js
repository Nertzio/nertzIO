import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {updateUserScore, fetchUsers, updateReduxUsersUponDbUpdates} from '../redux'
import deck from 'decked';

console.log(deck({ace: 'low', jokers: false})())
const handleMouseMove = (evt) => {
  console.log('x: ', evt.screenX, 'y: ', evt.screenY);
}
window.addEventListener('mousemove', handleMouseMove, true)
/**
 * COMPONENT
 */
export class UserInfo extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchUsers()

  }

  //updateReduxUsersUponDbUpdates and fetchUsers
  render() {
    const userKeys = Object.keys(this.props.users)
    const users = userKeys.map(key => {
        this.props.users[key].id = key;
      return this.props.users[key];

    })
    console.log('PROPS USERS', users)
    return (
      <div>
      {
        users.map((user) => (
          <div key={user.id} onClick={() => {this.props.updateUserScore(user)}}>
            <h3>Name or Username: {user.name || user.username}</h3>
            <h3>Email: {user.email}</h3>
            <h3>Score: {user.score}</h3>
            <h3>Card Stacks: {JSON.stringify(user.cardStacks)}</h3>
          </div>
        ))
      }
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    users: state.userInfo
  }
}

const mapDispatch = {updateUserScore, fetchUsers, updateReduxUsersUponDbUpdates}

export default connect(mapState, mapDispatch)(UserInfo)

// /**
//  * PROP TYPES
//  */
// UserInfo.propTypes = {
//   email: PropTypes.string
// }
