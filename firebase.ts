
import { initializeApp } from "firebase/app";

// Based on the provided SDK info, adapted for a web environment
const firebaseConfig = {
  apiKey: "AIzaSyCJbLHimRLa_v671QepjWWiSfwba1augNw",
  authDomain: "the-social-media-36756.firebaseapp.com",
  projectId: "the-social-media-36756",
  storageBucket: "the-social-media-36756.firebasestorage.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
