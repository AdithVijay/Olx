// Import the necessary functions from the modular Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";  
// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAtnJib6nHPJfNPYoNm5gQ_v_BHw18WEuM",
    authDomain: "olx-5dbca.firebaseapp.com",
    projectId: "olx-5dbca",
    storageBucket: "olx-5dbca.appspot.com",
    messagingSenderId: "495218152300",
    appId: "1:495218152300:web:2408efe88c4333ee069949",
    measurementId: "G-DYCZY2B5TW"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

const auth = getAuth(app);

const storage = getStorage(app);  

export { db,auth,storage };
