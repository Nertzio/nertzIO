import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';
import firebase from 'firebase';
const auth = firebase.auth();

class SignIn extends Component {

  constructor(props) {
    super(props)
    this.handleSignIn = this.handleSignIn.bind(this);
    // Note: Form values left uncleared for now, since will be redirecting
    this.state = {
      redirectSignedInUser: false
    }
  }


  handleSignIn () {
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
    // Sign in with email and pass.
    auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log("This is user after signing in: ", auth.currentUser.email)
      this.setState({
        redirectSignedInUser: true
      })
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert('No such email / password combination. Please try again.');
      console.log(error);
      return;
    });
  }


  render () {
    if (this.state.redirectSignedInUser) {
      return <Redirect to={'/join'} />
    }
      return (
        <div>
          <div>
            <div>
              <h1>Sign In To This AWESOME Game</h1>
              <input className="text-input" type="text" id="email" name="email" placeholder="Email"/>
              <input className="text-input" type="password" id="password" name="password" placeholder="Password" />
              <br />
              <button style={styles.btn} className="signin-button" id="quickstart-sign-in" onClick={this.handleSignIn} name="signin">Sign In</button>
            </div>
            <br />
            <div>
              <h2>No Account? No problem!</h2>
              <Link style={styles.btn} to={'/signup'}>Sign Up Here</Link>
            </div>
          </div>
        </div>
      )
  }
}

const styles = {
  btn: {
    background: '#f5eff7',
    backgroundImage: 'linear-gradient(to bottom, #f5eff7, #d6d3d6)',
    borderRadius: '8px',
    boxShadow: '2px 2px 3px #666666',
    fontFamily: 'Arial',
    color: '#4d404d',
    fontSize: '18px',
    padding: '5px 7px 5px 7px',
    textDecoration: 'none',
  }
}

export default SignIn
