import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCJzh8tz9KJDPtFI8h44zsSzDfUtME1eXs",
  authDomain: "frontend71p-3668f.firebaseapp.com",
  projectId: "frontend71p-3668f",
  storageBucket: "frontend71p-3668f.firebasestorage.app",
  messagingSenderId: "576000613545",
  appId: "1:576000613545:web:45ef38d4295a0eddbdddb8",
  measurementId: "G-XXG9EZH8LB"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
