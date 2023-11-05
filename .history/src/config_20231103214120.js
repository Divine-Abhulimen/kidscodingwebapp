// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbU3d40IC4pAOG8kr2eDiSXAD2-r_X4Pw",
  authDomain: "spacestation-b18c6.firebaseapp.com",
  projectId: "spacestation-b18c6",
  storageBucket: "spacestation-b18c6.appspot.com",
  messagingSenderId: "333641139298",
  appId: "1:333641139298:web:8eeb685eb5339af8a0fd3b",
  measurementId: "G-RTYVBQEEZC"
};

const database = getFirestore(app);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default db