
import store, {addLocalUserInfo} from '../redux'
const {dispatch} = store;
import firebase from 'firebase';
const auth = firebase.auth();

  //Event listener for state changes on auth
export function initAuth () {
  auth.onAuthStateChanged(user => {
    if (user) {
      console.log("User inside initAuth: ", user.email)
      let localUser = {
        displayName: user.displayName,
        email: user.email,
      // emailVerified: user.emailVerified,
        uid: user.uid,
      }
      dispatch(addLocalUserInfo(localUser));
    } else {
      // No user is signed in.
      console.log("Not signed in yet / signed out")
    }
  });
}
