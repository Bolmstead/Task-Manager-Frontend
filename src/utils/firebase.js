// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBx8A2RSRi6KDoeQF3Q_LydSILXSCqAXWE",
  authDomain: "taxrise-6cf9f.firebaseapp.com",
  projectId: "taxrise-6cf9f",
  storageBucket: "taxrise-6cf9f.appspot.com",
  messagingSenderId: "623221794931",
  appId: "1:623221794931:web:53f73b999e38a8fec5e206",
  measurementId: "G-C6CS85JSN8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
