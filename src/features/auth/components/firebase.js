// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqzAU9H9RUBWbN3xVVdJSd9M3VRGeTI1s",
  authDomain: "auth-aceb5.firebaseapp.com",
  projectId: "auth-aceb5",
  storageBucket: "auth-aceb5.appspot.com",
  messagingSenderId: "835220517300",
  appId: "1:835220517300:web:41dd063379a294f6d982e1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };



