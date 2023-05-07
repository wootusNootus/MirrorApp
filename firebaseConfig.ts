import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGtuS3M1gZGWQwE7Wa2xbgfmV4UYvxq8A",
  authDomain: "mirror-73945.firebaseapp.com",
  projectId: "mirror-73945",
  storageBucket: "mirror-73945.appspot.com",
  messagingSenderId: "607955127529",
  appId: "1:607955127529:web:42d5d591ae2f4aefedb478",
  measurementId: "G-0V2MELRJLT",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
