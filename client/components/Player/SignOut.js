import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import firebase from 'firebase';
const auth = firebase.auth();
import {getCurrentUserInRedux} from '../../redux/reduxUtils'

class SignOut extends Component {

  constructor(props) {
    super(props)
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignOut () {
    auth.signOut()
    .then(() => <Redirect to={'/signin'} />)
  }

  render () {
    const signedInUser = getCurrentUserInRedux()
    console.log("Signed in user", signedInUser)

    if (!signedInUser) {
      return <Redirect to={'/signin'} />
    }
    return (
      <div>
        {this.handleSignOut()}
      </div>
    )
  }
}

export default SignOut
