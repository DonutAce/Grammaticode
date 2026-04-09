import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBj7rTUxIubZSHkZKuvLwG98j8pKSsE76E",
  authDomain: "grammaticode.firebaseapp.com",
  projectId: "grammaticode",
  storageBucket: "grammaticode.firebasestorage.app",
  messagingSenderId: "272697038085",
  appId: "1:272697038085:web:e07cdfe23029840aeb536c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { app, db, firebaseConfig };
