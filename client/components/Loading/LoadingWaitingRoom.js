import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {LoadingSpinner} from '../Loading';
import {signoutCurrentUser} from '../../firebase/authUtils';

class LoadingWaitingRoom extends Component {

  componentDidMount() {
    if (this.props.somethingIsLoading) {
      return setTimeout(() => signoutCurrentUser(), 1000);
    }
  }

  render() {
      const {somethingIsLoading, location} = this.props;
      if (somethingIsLoading) {
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
  somethingIsLoading: state.somethingIsLoading,
})

export default connect(mapState, null)(LoadingWaitingRoom);
