import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Replace with your Firebase config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBfCXNotDu08nhFlm1VFpiJDm67RFrOc5w",
  authDomain: "week-8-754f2.firebaseapp.com",
  projectId: "week-8-754f2",
  storageBucket: "week-8-754f2.firebasestorage.app",
  messagingSenderId: "563784551493",
  appId: "G-TXEMMT52F9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Storage
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
