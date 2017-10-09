import './firebase/initFirebase';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {
  ProtectedRoute,
  UnprotectedRoute,
} from './Routing';
import PropTypes from 'prop-types';
import history from './history';
import firebase from 'firebase';
import {initAuth} from './firebase'
const auth = firebase.auth();



import {GameArea, LoadingSpinner, MainLayout, SignUp, SignIn, UserHome, JoinAGame, GamePending, Home} from './components'


import {me} from './redux'

class Routes extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount () {
    initAuth()
  }

  render () {
    const {isLoggedIn, somethingIsLoading} = this.props;
    // if (somethingIsLoading) return <LoadingSpinner />

    return (
      <Router>
        <MainLayout>
          <Switch>

            <ProtectedRoute
              {...{isLoggedIn}}
              exact path="/join"
              component={JoinAGame}
            />

            <ProtectedRoute
              {...{isLoggedIn}}
              exact path="/pendingGames/:gameId"
              component={GamePending}
            />

            <ProtectedRoute
              {...{isLoggedIn}}
              exact path="/gamesInProgress/:gameId"
              component={GameArea}
            />

            {/*<ProtectedRoute
              {...{isLoggedIn}}
              exact path="/logout"
              component={LoggingOut}
            />*/}

            <UnprotectedRoute
              {...{isLoggedIn}}
              exact path="/signup"
              component={SignUp}
            />

            <UnprotectedRoute
              {...{isLoggedIn}}
              exact path="/signin"
              component={SignIn}
            />

            <Route component={Home} />
          </Switch>
        </MainLayout>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
  isLoggedIn: state.meReducer.uid
});

export default connect(mapState)(Routes);

