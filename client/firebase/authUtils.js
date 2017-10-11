
import store, {addLocalUserInfo} from '../redux'
import {
  tellReduxImDoneLoading,
  tellReduxImLoading,
} from '../redux/reduxUtils';
const {dispatch} = store;
import firebase from 'firebase';
const auth = firebase.auth();

  //Event listener for state changes on auth
export function initAuth () {
  tellReduxImLoading();
  return Promise.resolve(auth.onAuthStateChanged(user => {
    tellReduxImLoading()
    if (user) {
      console.log("User inside initAuth: ", user.email)
      let localUser = {
        displayName: user.displayName,
        email: user.email,
      // emailVerified: user.emailVerified,
        uid: user.uid,
      }

      dispatch(addLocalUserInfo(localUser));
      setTimeout(() => tellReduxImDoneLoading(), 1500);
    } else {
      // No user is signed in.
      let localUser = {
        displayName: '',
        email: '',
      // emailVerified: user.emailVerified,
        uid: '',
      }

      dispatch(addLocalUserInfo(localUser));
      setTimeout(() => tellReduxImDoneLoading(), 1500);
      console.log("Not signed in yet / signed out")
    }
  }))
  .then(() => console.log("Auth listener completed updates to redux user state"));
}
