import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAblueg9c2yae_mSvOW9nWoDwud_tNx60k",
  authDomain: "cinescope-baf8e.firebaseapp.com",
  projectId: "cinescope-baf8e",
  storageBucket: "cinescope-baf8e.firebasestorage.app",
  messagingSenderId: "1093894315269",
  appId: "1:1093894315269:web:bfd031221aa34d6fc82b6c",
  measurementId: "G-J43M4CL3SD",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
export { auth, provider, db };
