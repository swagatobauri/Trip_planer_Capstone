// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4sUrdwjhHYWe7IjMJPZbfLzAQtyscewA",
  authDomain: "ai-trip-7e195.firebaseapp.com",
  projectId: "ai-trip-7e195",
  storageBucket: "ai-trip-7e195.firebasestorage.app",
  messagingSenderId: "176523029537",
  appId: "1:176523029537:web:feac8c96f2024f60480760",
  measurementId: "G-QSRWQQY78M"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
// const analytics = getAnalytics(app);