import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// your firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBcZsTW7gR3pDwuKacG_D8YmLB25Am2eG4",
  authDomain: "test-2c8d2.firebaseapp.com",
  projectId: "test-2c8d2",
  storageBucket: "test-2c8d2.firebasestorage.app",
  messagingSenderId: "665314616298",
  appId: "1:665314616298:web:8a510ddd8fbaecee208893",
};

// initialize app
const app = initializeApp(firebaseConfig);

// 🔥 THIS WAS MISSING
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
