// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "rehearsify-muse.firebaseapp.com",
  projectId: "rehearsify-muse",
  storageBucket: "rehearsify-muse.appspot.com",
  messagingSenderId: "554122470444",
  appId: "1:554122470444:web:d813eca5db6a5435ab1d89"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app)

export {
    app,
    auth,
    db
};

