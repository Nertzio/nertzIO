import {
  setCurrentUserInRedux,
  storeFirebaseAppInRedux,
} from '../redux/reduxUtils';
import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/database';
import secrets from '../secrets'
firebase.initializeApp(secrets.firebaseConfig);
// firebase.database.enableLogging(message => console.log('[FIREBASE] ', message));
// const db = firebase.database();
// const auth = firebase.auth();

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    const userInfo = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      isAnonymous: user.isAnonymous,
      photoURL: user.photoURL,
    };
    return setCurrentUserInRedux(userInfo);
  } else {
    return setCurrentUserInRedux(null);
  }
})

storeFirebaseAppInRedux(firebase)

// create new game instance

// add all players

// generate, shuffle, and set stacks for all players

// instantiate Card Field grid spaces



