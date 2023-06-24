// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC61ntfvXNX3r4YEbQNLNGJoq1lkswUPeY",
  authDomain: "twitter-fullstack.firebaseapp.com",
  projectId: "twitter-fullstack",
  storageBucket: "twitter-fullstack.appspot.com",
  messagingSenderId: "75893423952",
  appId: "1:75893423952:web:e8eed86bf4a0bee6e7b655"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;