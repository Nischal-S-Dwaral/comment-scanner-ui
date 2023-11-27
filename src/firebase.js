import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebase = {
    apiKey: "AIzaSyAcJYOzsfL53idF145QxyooL7Lw6TRJcD4",
    authDomain: "comment-scanner-f344d.firebaseapp.com",
    projectId: "comment-scanner-f344d",
    storageBucket: "comment-scanner-f344d.appspot.com",
    messagingSenderId: "55524995783",
    appId: "1:55524995783:web:f5aa66bb3de3bc249084e2",
};

// Initialize Firebase
const app = initializeApp(firebase);
const auth = getAuth(app);

export{app, auth}
