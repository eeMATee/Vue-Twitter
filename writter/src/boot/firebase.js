// import { boot } from 'quasar/wrappers'

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";

import "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCKX2LQ5fLDYngli6lbbSrd7FtKZ2OU2OU",
  authDomain: "tweeter-5b7c2.firebaseapp.com",
  projectId: "tweeter-5b7c2",
  storageBucket: "tweeter-5b7c2.appspot.com",
  messagingSenderId: "118867676780",
  appId: "1:118867676780:web:1ed09925b82fcfdde19249"

}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


let db = firebase.firestore()

export default db;