// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsNojKKqcB4_8pT5s5p6tCu2qiMcckU34",
  authDomain: "extra-argel.firebaseapp.com",
  projectId: "extra-argel",
  storageBucket: "extra-argel.appspot.com",
  messagingSenderId: "317446312700",
  appId: "1:317446312700:web:55a5a2b11913a922c07d79",
  measurementId: "G-WXBK419RZ8"
};

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);

