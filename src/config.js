// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCQhy4z74DWKRQXclm8D9kCRlxvLh0-Eds",
  authDomain: "test1-4430d.firebaseapp.com",
  projectId: "test1-4430d",
  storageBucket: "test1-4430d.appspot.com",
  messagingSenderId: "277301060334",
  appId: "1:277301060334:web:21c8ae73131cc3865909ff"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}

export {firebase};
export const auth = getAuth(app);

