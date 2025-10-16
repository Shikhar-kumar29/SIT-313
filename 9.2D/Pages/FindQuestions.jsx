import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAnXz4uCYMTu_1zursNd3n9cRZ1HL1jYI0",
  authDomain: "devdeakin-app-ddfe9.firebaseapp.com",
  projectId: "devdeakin-app-ddfe9",
  storageBucket: "devdeakin-app-ddfe9.firebasestorage.app",
  messagingSenderId: "536456782989",
  appId: "1:536456782989:web:59d9646d1786a83eef6ec4",
  measurementId: "G-CW8XRVRYE0"
}; 

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export default app;
