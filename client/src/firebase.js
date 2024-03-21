// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "e-commerce-f3116.firebaseapp.com",
  projectId: "e-commerce-f3116",
  storageBucket: "e-commerce-f3116.appspot.com",
  messagingSenderId: "816136071455",
  appId: "1:816136071455:web:b1841b23c9733f7b9ee82a",
  measurementId: "G-SPLKVHVGSW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
