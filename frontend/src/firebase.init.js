// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDxrtz1JwCb8MIC2M_tOmAXmegox0R1cdc",
  authDomain: "twitter-b1978.firebaseapp.com",
  projectId: "twitter-b1978",
  storageBucket: "twitter-b1978.appspot.com",
  messagingSenderId: "955922712315",
  appId: "1:955922712315:web:1960ff8b97d2b0171ad25e",
  measurementId: "G-VQ2T354TNW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
