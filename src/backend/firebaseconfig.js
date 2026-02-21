import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Correct import

// Your web app's Firebase configuration


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize services
export let __AUTH = getAuth(firebaseApp);  
export let __DB = getFirestore(firebaseApp);  
