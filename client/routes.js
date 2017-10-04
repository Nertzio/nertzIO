import './firebase/initFirebase';
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Router} from 'react-router'
import {Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {GameArea, Login, Signup, UserHome, JoinAGame, GamePending} from './components'
import {me} from './redux'

class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path='/join' component={JoinAGame} />
          <Route exact path='/pendingGames/:gameId' component={GamePending} />
          <Route exact path='/gamesInProgress/:gameId' component={GameArea} />
        </Switch>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = null;

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me());
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  // isLoggedIn: PropTypes.bool.isRequired
}
