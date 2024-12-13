// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0PGBMAQIpbp_o3-yWR-OVMf0PJa2Q_pM",
  authDomain: "police-app-a8019.firebaseapp.com",
  databaseURL: "https://police-app-a8019-default-rtdb.firebaseio.com/", // Added this line
  projectId: "police-app-a8019",
  storageBucket: "police-app-a8019.appspot.com",
  messagingSenderId: "640246325565",
  appId: "1:640246325565:web:c02915b80194f7abec2554",
  measurementId: "G-6DVKZR8562",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);



// Export database for use in other files
export { database };
