// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiLYN8wc-8SjCvpFHUTQ3DSt9QN5xFUBw",
  authDomain: "crawlee-17c00.firebaseapp.com",
  projectId: "crawlee-17c00",
  storageBucket: "crawlee-17c00.firebasestorage.app",
  messagingSenderId: "405096943130",
  appId: "1:405096943130:web:c1d4773aa5c25d56bc0ba3",
  measurementId: "G-BP90Q3MBVE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);