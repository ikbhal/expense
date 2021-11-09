
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCqJyBoPLXy5CpotZPOsSKjK4rKJTCAbgE",
  authDomain: "ikbhal-cb53f.firebaseapp.com",
  projectId: "ikbhal-cb53f",
  storageBucket: "ikbhal-cb53f.appspot.com",
  messagingSenderId: "839053098923",
  appId: "1:839053098923:web:d96c4df68fc216fa189cee",
  measurementId: "G-BNYMN6KNXP"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const db = firebase.firestore();