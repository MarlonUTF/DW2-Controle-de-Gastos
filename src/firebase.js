import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAFLeS-HwBTRiskLP0lwEfMmefiR7_H30M",
    authDomain: "dw2-financas.firebaseapp.com",
    projectId: "dw2-financas",
    storageBucket: "dw2-financas.firebasestorage.app",
    messagingSenderId: "47304809757",
    appId: "1:47304809757:web:f7e4a4dfc8b30bcb6255f4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider, signInWithPopup };