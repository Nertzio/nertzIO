import './firebase/initFirebase';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {
  tellReduxImLoading,
  tellReduxImDoneLoading,
} from './redux/reduxUtils';
import {
  ProtectedRoute,
  UnprotectedRoute,
} from './Routing';

// import firebase from 'firebase';
import {initAuth} from './firebase'
// const auth = firebase.auth();



import {
  BlurWhenActionRequired,
  GameArea,
  GamePending,
  Home,
  JoinAGame,
  LoadingSpinner,
  MainLayout,
  SignOut,
  SignUp,
  SignIn,
  UserHome,
} from './components'


import {me} from './redux'

class Routes extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount () {
    tellReduxImLoading()
    initAuth();
    setTimeout(() => tellReduxImDoneLoading(), 1000);
  }

  render () {
    const {isLoggedIn, somethingIsLoading} = this.props;
    if (somethingIsLoading) return <LoadingSpinner />

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

            {<ProtectedRoute
              {...{isLoggedIn}}
              exact path="/signout"
              component={SignOut}
            />}

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
  isLoggedIn: state.user.uid,
  somethingIsLoading: state.app.somethingIsLoading,
});

export default connect(mapState)(Routes);

