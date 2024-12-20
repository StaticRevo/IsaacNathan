import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc  } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyActUWZtv7BL2DxjjSlJkF0deLgZdZgvh0",
    authDomain: "mobile-app-e1ef9.firebaseapp.com",
    projectId: "mobile-app-e1ef9",
    storageBucket: "mobile-app-e1ef9.firebasestorage.app",
    messagingSenderId: "819775139646",
    appId: "1:819775139646:web:32959cb3d598ee55f3066f",
    measurementId: "G-36SYR203XD"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export { collection, addDoc };