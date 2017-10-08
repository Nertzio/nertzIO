import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {LoadingSpinner} from '../Loading';
import {signoutCurrentUser} from '../../firebase/authUtils';

class LoggingOut extends Component {

  componentDidMount() {
    if (this.props.userIsLoggedIn) {
      return setTimeout(() => signoutCurrentUser(), 1000);
    }
  }

  render() {
      const {userIsLoggedIn, location} = this.props;
      if (userIsLoggedIn) {
        return (
          <div>
            <LoadingSpinner  />
          </div>
        )
      } else {
        return  <Redirect to={{pathname: '/', state: {from: location}}} />
      }
  }
}

const mapState = state => ({
  userIsLoggedIn: state.user,
})

export default connect(mapState, null)(LoggingOut);
