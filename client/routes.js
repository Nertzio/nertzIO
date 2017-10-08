import './firebase/initFirebase'; // starts firebase app/auth/database
import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {Router} from 'react-router';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  ProtectedRoute,
  SignedOutRoute,
} from './Routing';
// import history from './history';
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/database';
// import {initAuth} from './firebase'
// const auth = firebase.auth();

import {
  GameArea,
  GamePending,
  Home,
  JoinAGame,
  LoadingSpinner,
  Login,
  LoggingOut,
  MainLayout,
  SignIn,
  SignUp,
  UserHome,
} from './components'


// import {me} from './redux'

class Routes extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount () {
    // this.props.loadInitialData()
    // initAuth()
  }


  render () {
    const {isLoggedIn, somethingIsLoading} = this.props;
    if (somethingIsLoading) return <LoadingSpinner />

    return (
      <Router /*history={history}*/ >
        <MainLayout>
          <Switch>

            <ProtectedRoute
              {...{isLoggedIn}}
              exact path="/join"
              component={JoinAGame}
            />

            <ProtectedRoute
              {...{isLoggedIn}}
              exact path="/pending-game/:gameId"
              component={GamePending}
            />

            <ProtectedRoute
              {...{isLoggedIn}}
              exact path="/play/:gameId"
              component={GameArea}
            />

            <ProtectedRoute
              {...{isLoggedIn}}
              exact path="/logout"
              component={LoggingOut}
            />

            {/* <SignedOutRoute
              {...{isLoggedIn}}
              exact path="/signup"
              component={SignUp}
            /> */}

            <SignedOutRoute
              {...{isLoggedIn}}
              exact path="/login"
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
  isLoggedIn: state.user,
  somethingIsLoading: state.somethingIsLoading,
})
const mapDispatch = null;
// const mapDispatch = (dispatch) => {
//   return {
//     loadInitialData () {
//       dispatch(me());
//     }
//   }
// }

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
// Routes.propTypes = {
//   loadInitialData: PropTypes.func.isRequired,
//   // isLoggedIn: PropTypes.bool.isRequired
// }
