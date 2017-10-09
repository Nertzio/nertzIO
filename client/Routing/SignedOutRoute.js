import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

const SignedOutRoute = ({component: Component, isLoggedIn, ...otherProps}) => {
  const youWereRedirectedHere = otherProps.location.state;
  const whereYouCameFrom = youWereRedirectedHere ?
    youWereRedirectedHere.from.pathname :
    '/';
  return (
    <Route
      {...otherProps}
      render={props => isLoggedIn ?
        <Redirect to={whereYouCameFrom} /> :
        <Component {...props} />
      }/>
  )
}

export default SignedOutRoute;
