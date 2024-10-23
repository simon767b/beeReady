// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "@firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjEZ-t7-eNCYb1wqMrb33al4x7KRJKT9M",
  authDomain: "beeready-8e5f5.firebaseapp.com",
  databaseURL:
    "https://beeready-8e5f5-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "beeready-8e5f5",
  storageBucket: "beeready-8e5f5.appspot.com",
  messagingSenderId: "752178802298",
  appId: "1:752178802298:web:c45180b4a3182537c255c3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
