import {initializeApp} from 'firebase/app'
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBdgiUfGsQ-ymqTGlE6nB2M5Xv4Lr1KZSc",
    authDomain: "linkedin-clone-a0570.firebaseapp.com",
    projectId: "linkedin-clone-a0570",
    storageBucket: "linkedin-clone-a0570.appspot.com",
    messagingSenderId: "533472713798",
    appId: "1:533472713798:web:b8e3a0d21e069a1cee7e47",
    measurementId: "G-W6MWD7QG1Y"
  };


const firebaseApp = initializeApp(firebaseConfig);

const db =  getFirestore();
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);

export { auth, provider, storage};
export default db;