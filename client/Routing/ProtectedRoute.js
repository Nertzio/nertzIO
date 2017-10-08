import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

const ProtectedRoute = ({component: Component, isLoggedIn, ...otherProps}) => {
  return (
    <Route
      {...otherProps}
      render={props => isLoggedIn ?
        <Component {...props} /> :
        <Redirect to={{pathname: '/login', state: {from: props.location}}} />
      }/>
  )
}

export default ProtectedRoute;
