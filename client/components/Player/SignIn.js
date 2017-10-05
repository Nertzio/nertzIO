import React, { Component } from 'react';
import firebase from 'firebase';
const auth = firebase.auth();

class SignIn extends Component {

  constructor(props) {
    super(props)
    this.handleSignIn = this.handleSignIn.bind(this);
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

  handleSignOut () {
    //TODO: Create sign out functionality to support signout button below
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
    auth.signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
      console.log(error);
    });
    //TODO: Add functionality for redirect (either here, or in event listener)
  }



  render () {
    this.initAuth()

    return (
      <div>
        {!auth.currentUser &&
        <div>
          <h1>Sign In To This AWESOME Game</h1>
          <input className="text-input" type="text" id="email" name="email" placeholder="Email"/>
          <input className="text-input" type="password" id="password" name="password" placeholder="Password"/>
          <br/>
          <button className="signin-button" id="quickstart-sign-in" onClick={this.handleSignIn} name="signin">Sign In</button>
        </div>
        }

        {auth.currentUser &&
        <div>
          <h1>Hi there {auth.currentUser.displayName}!</h1>
          <button className="signout-button" id="quickstart-sign-out" onClick={this.handleSignOut} name="signout">Sign Out</button>
        </div>
        }

      </div>
    )
  }
}

export default SignIn
