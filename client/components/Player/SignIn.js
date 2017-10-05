import React, { Component } from 'react';
import firebase from 'firebase';
const auth = firebase.auth();

class SignIn extends Component {

  constructor(props) {
    super(props)
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.initAuth = this.initAuth.bind(this)
    this.state = {
      displayName: '',
      email: '',
      uid: ''
    }
    // Note: Form values left uncleared for now, since will be redirecting
  }

  componentDidMount () {
    this.initAuth()
  }

  //Event listener for state changes on auth
  initAuth() {
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log("User inside initAuth: ", user.email)
         // Need further clarity on where these values need to be passed initially (i.e. Redux vs Firebase instance). Currently stored on local state as interim solution for storing values.
        this.setState({
          displayName: user.displayName,
          email: user.email,
        // emailVerified: user.emailVerified,
          uid: user.uid,
        })
      } else {
        // No user is signed in.
        console.log("Not signed in yet / signed out")
      }
    });
  }

  handleSignOut () {
    this.setState({
      displayName: '',
      email: '',
      // emailVerified: '',
      uid: '',
    })
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
      console.log("This is local state after signing in: ", this.state.email)
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
      console.log(error);
    });
    //TODO: Add functionality for redirect (either here, or in event listener)
  }



  render () {
    if (auth) {
      return (
        <div>
          {!this.state.email &&
          <div>
            <h1>Sign In To This AWESOME Game</h1>
            <input className="text-input" type="text" id="email" name="email" placeholder="Email"/>
            <input className="text-input" type="password" id="password" name="password" placeholder="Password"/>
            <br/>
            <button className="signin-button" id="quickstart-sign-in" onClick={this.handleSignIn} name="signin">Sign In</button>
          </div>
          }

          {this.state.email &&
          <div>
            <h1>Hi there, {this.state.displayName}!</h1>
            <button className="signout-button" id="quickstart-sign-out" onClick={this.handleSignOut} name="signout">Sign Out</button>
          </div>
          }

        </div>
      )
    }
  }
}

export default SignIn
