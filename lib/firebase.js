import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyABZxgrM2f-srGeXBc_VjmE_u6pCKfih3w",
  authDomain: "personal-portfolio-with-blog.firebaseapp.com",
  projectId: "personal-portfolio-with-blog",
  storageBucket: "personal-portfolio-with-blog.firebasestorage.app",
  messagingSenderId: "950861735933",
  appId: "1:950861735933:web:66b7bcb9c7699b84991b94",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);