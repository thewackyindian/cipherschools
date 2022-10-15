import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCvkAJowdLaBTMoVq-nD-UZ_o-p5NDEUKs",
  authDomain: "videos-cbde2.firebaseapp.com",
  projectId: "videos-cbde2",
  storageBucket: "videos-cbde2.appspot.com",
  messagingSenderId: "567064558041",
  appId: "1:567064558041:web:2f0e25e157ca74da02c1c8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
