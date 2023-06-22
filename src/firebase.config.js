
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAbYL-sayLnTMYG7UXRh6hoIuwbx2VsR24",
  authDomain: "asap-services-794b4.firebaseapp.com",
  projectId: "asap-services-794b4",
  storageBucket: "asap-services-794b4.appspot.com",
  messagingSenderId: "559965319390",
  appId: "1:559965319390:web:4ba9ec8520ec45adb6d24f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)
export default app