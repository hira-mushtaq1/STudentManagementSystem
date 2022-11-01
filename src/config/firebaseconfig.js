// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBwlnKxqi9kPUr4kPbVmfD1zrtFXKkcsEE",
  authDomain: "studentsmanagement-bdc85.firebaseapp.com",
  projectId: "studentsmanagement-bdc85",
  storageBucket: "studentsmanagement-bdc85.appspot.com",
  messagingSenderId: "106957853197",
  appId: "1:106957853197:web:5e93a456f189627ed37b44",
  measurementId: "G-JTKE0745QV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
