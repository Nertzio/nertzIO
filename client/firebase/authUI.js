import firebaseUI from 'firebaseui';
import store from '../redux';
const {firebase} = store.getState().firebaseRefs;

const uiConfig = {
  signInSuccessUrl: 'http://localhost:8080/',
  callbacks: {
    // Called when the user has been successfully signed in.
    signInSuccess: function(user, credential, redirectUrl) {
      // handleSignedInUser(user);
      // Do not redirect.
      return true;
    }
  },
  // Opens IDP Providers sign-in flow in a popup.
  signInFlow: 'popup',
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      scopes: ['https://www.googleapis.com/auth/plus.login']
    },
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      // Whether the display name should be displayed in Sign Up page.
      requireDisplayName: true
    },
  ],
  // Terms of service url.
  tosUrl: 'http://localhost:8080/'
};

const authUI = new firebaseUI.auth.AuthUI(firebase.auth());


export default function displayAuthPanelIn(cssIdSelector) {
  return authUI.start(cssIdSelector, uiConfig);
}
