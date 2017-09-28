import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {updateScore} from '../store'

/**
 * COMPONENT
 */
export const UserInfo = (props) => {
  const {name, email, score} = props.user

  return (
    <div>
      <h3>Name: {name}</h3>
      <h3>Email: {email}</h3>
      <h3>Score: {score}</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.user
  }
}

const mapDispatch = {updateScore}

export default connect(mapState, mapDispatch)(UserInfo)

// /**
//  * PROP TYPES
//  */
// UserInfo.propTypes = {
//   email: PropTypes.string
// }
