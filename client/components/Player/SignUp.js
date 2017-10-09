import React, { Component } from 'react';
import firebase from 'firebase';
import {Redirect} from 'react-router-dom'
const auth = firebase.auth();
import {initAuth} from '../../firebase'

class SignUp extends Component {

  constructor(props) {
    super(props)
    this.handleSignUp = this.handleSignUp.bind(this)
    // Note: Form values left uncleared for now, since will be redirecting
    this.state = {
      redirectToJoinGame: false
    }
  }

  handleSignUp () {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (email.length < 4 || email.indexOf('@') === -1) {
      alert('Please enter a valid email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a valid password.');
      return;
    }

    auth.createUserWithEmailAndPassword(email, password)
    .then(user => (
      user.updateProfile({
          displayName: username
      })
    ))
    .then(() => Promise.resolve(initAuth()))
    .then(() => this.setState({ redirectToJoinGame: true }))
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage)
      console.log(error)
    })
    // Successful sign-up automagically signs the user in
  }


  render () {

    return (
      <div>
        {this.state.redirectToJoinGame && <Redirect to={'/join'} />}
        <h1>Sign Up For This AWESOME Game</h1>
        <input className="text-input" type="text" id="username" name="username" placeholder="Display Name" />
        <input className="text-input" type="text" id="email" name="email" placeholder="Email" />
        <input className="text-input" type="password" id="password" name="password" placeholder="Password" />
        <br />
        <button className="signup-button" id="quickstart-sign-up" onClick={this.handleSignUp} name="signup">Sign Up</button>
      </div>
    )
  }

}

export default SignUp

