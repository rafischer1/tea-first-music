import firebase from "firebase/app";
import "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVqqF--63wNpyA4qzq1k4LnadlBCmNaHk",
  authDomain: "tea-first-store.firebaseapp.com",
  projectId: "tea-first-store",
  storageBucket: "tea-first-store.appspot.com",
  appId: "1:578742752749:web:3f2f9ea585937d1487c3e4",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage };
