// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDattVuvtjhecVyU8rIx1X8ANswjDIPH4M",
    authDomain: "form-24b5d.firebaseapp.com",
    projectId: "form-24b5d",
    storageBucket: "form-24b5d.appspot.com",
    messagingSenderId: "373320572374",
    appId: "1:373320572374:web:0db24cfce659e5330a5877"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db}
