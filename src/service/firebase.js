// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFirestore } from 'firebase/firestore';
// const firebase = require('firebase/auth');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_orhkGEuPRQTDPr3WXj6qMI19H6NLk7E",
  authDomain: "que-como-6b0e9.firebaseapp.com",
  databaseURL: "https://que-como-6b0e9.firebaseio.com",
  projectId: "que-como-6b0e9",
  storageBucket: "que-como-6b0e9.appspot.com",
  messagingSenderId: "202337210113",
  appId: "1:202337210113:web:d153136ccb3bb6ff72d500"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const db = getFirestore(app);

console.log(firebase)
export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithRedirect(provider);
// export const signInWithGoogle = () => auth.signInWithPopup(provider);

//export firebase as default
export default firebase;

