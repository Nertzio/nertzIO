import firebase from 'firebase'
import secrets from '../secrets'
firebase.initializeApp(secrets.firebase);
firebase.database.enableLogging(message => console.log("[FIREBASE] ", message));
const db = firebase.database();

// create new game instance

// add all players

// generate, shuffle, and set stacks for all players

// instantiate Card Field grid spaces



