// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "planningpoker-f8218.firebaseapp.com",
  projectId: "planningpoker-f8218",
  storageBucket: "planningpoker-f8218.appspot.com",
  messagingSenderId: "109591144580",
  appId: "1:109591144580:web:223e0e543f877f8151bad1",
  measurementId: "G-69NP4LXGKK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);