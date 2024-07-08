import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD27XQJFG04cXIaloTSqcuintckaqIIHLI",
  authDomain: "yaya-19a06.firebaseapp.com",
  projectId: "voiceofchristian",
  storageBucket: "yaya-19a06.appspot.com",
  messagingSenderId: "482064265743",
  appId: "1:482064265743:web:d897dc99d8c3859534a97a",
  measurementId: "G-LNT8C93F2W",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
