import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";    
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2brQMVZLVKnS1pz1cvwoDCpiRHkez4jw",
  authDomain: "puzzle-memories.firebaseapp.com",
  projectId: "puzzle-memories",
  storageBucket: "puzzle-memories.appspot.com",
  messagingSenderId: "489002894282",
  appId: "1:489002894282:web:17e23007e3c3fd6cfc8533",
  measurementId: "G-G6GTBL6HHX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db, app };