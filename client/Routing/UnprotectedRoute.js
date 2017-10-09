import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const UnprotectedRoute = ({component: Component, isLoggedIn, ...otherProps}) => {
  const youWereRedirectedHere = otherProps.location.state;
  const whereYouCameFrom = youWereRedirectedHere ?
    youWereRedirectedHere.from.pathname :
    '/join';
  return (
    <Route
      {...otherProps}
      render={props => isLoggedIn ?
        <Redirect to={whereYouCameFrom} /> :
        <Component {...props} />
      }/>
  )
}

export default UnprotectedRoute;
