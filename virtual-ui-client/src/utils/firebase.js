
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "virtualui-c75a5.firebaseapp.com",
  projectId: "virtualui-c75a5",
  storageBucket: "virtualui-c75a5.firebasestorage.app",
  messagingSenderId: "261526140700",
  appId: "1:261526140700:web:7e7943b7da5d322c506cd9",
  measurementId: "G-DNJM61WQBZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth , provider}