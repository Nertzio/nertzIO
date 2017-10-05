import React, { Component } from 'react';
import firebase from 'firebase';
const auth = firebase.auth();

class SignUp extends Component {

  constructor(props) {
    super(props)
    this.handleSignUp = this.handleSignUp.bind(this)
    this.initAuth = this.initAuth.bind(this)
    let displayName, email, uid;
    // Note: Form values left uncleared for now, since will be redirecting
  }

    //Event listener for state changes on auth
  initAuth() {
    auth.onAuthStateChanged(function(user) {
      if (user) {
        console.log(user.email)
        // ISSUE -> The below vals are not currently accessible, since variable names are initialized within a class without 'this'. Before assigning these to local state, need further clarity on where these values need to be passed initially (i.e. Redux vs Firebase instance)
        // displayName = user.displayName;
        // email = user.email;
        // emailVerified = user.emailVerified;
        // uid = user.uid;
      } else {
        // No user is signed in.
      }
    });
  }

  handleSignUp () {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }

    auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage)
      console.log(error)
    })
    // Successful sign-up automagically signs the user in
    // TODO: Add functionality for redirect (either here, or in event listener)
  }


  render () {
    this.initAuth()

    return (
      <div>
        <h1>Sign Up For This AWESOME Game</h1>
        <input className="text-input" type="text" id="username" name="username" placeholder="Username"/>
        <input className="text-input" type="text" id="email" name="email" placeholder="Email"/>
        <input className="text-input" type="password" id="password" name="password" placeholder="Password"/>
        <br/>
        <button className="signup-button" id="quickstart-sign-up" onClick={this.handleSignUp} name="signup">Sign Up</button>
      </div>
    )
  }

}

export default SignUp

