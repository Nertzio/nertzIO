// PLACEHOLDER for use this as a central point to declare firebase auth listener for use throughout the app -  may not be needed, depending on how user data is accessed for UI

import firebase from 'firebase';
const auth = firebase.auth();
export let currentUser = {}

  //Event listener for state changes on auth
export function initAuth () {
  auth.onAuthStateChanged(user => {
    if (user) {
      console.log("User inside initAuth: ", user.email)
       // Need further clarity on where these values need to be passed initially (i.e. Redux vs Firebase instance). Currently stored on local variable as interim solution for storing values.
      currentUser = {
        displayName: user.displayName,
        email: user.email,
      // emailVerified: user.emailVerified,
        uid: user.uid,
      }
    } else {
      // No user is signed in.
      console.log("Not signed in yet / signed out")
    }
  });
};
