import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import firebase from 'firebase';
const auth = firebase.auth();

class SignIn extends Component {

  constructor(props) {
    super(props)
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    // Note: Form values left uncleared for now, since will be redirecting
    this.state = {
      redirectSignedInUser: false
    }
  }

  handleSignOut () {
    auth.signOut()
  }


  handleSignIn () {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }
    // Sign in with email and pass.
    auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log("This is user after signing in: ", auth.currentUser.email)
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
      console.log(error);
    });
    this.setState({
      redirectSignedInUser: true
    })
  }



  render () {
    if (this.state.redirectSignedInUser) {
      return <Redirect to={'/join'} />
    }
      return (
        <div>
          {true &&
          <div>
            <h1>Sign In To This AWESOME Game</h1>
            <input className="text-input" type="text" id="email" name="email" placeholder="Email"/>
            <input className="text-input" type="password" id="password" name="password" placeholder="Password"/>
            <br/>
            <button className="signin-button" id="quickstart-sign-in" onClick={this.handleSignIn} name="signin">Sign In</button>
          </div>
          }

          {false &&
          <div>
            <h1>Hi there, {this.state.displayName}!</h1>
            <button className="signout-button" id="quickstart-sign-out" onClick={this.handleSignOut} name="signout">Sign Out</button>
          </div>
          }

        </div>
      )
  }
}

export default SignIn
