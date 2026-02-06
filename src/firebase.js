// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


var firebaseConfig = {

  apiKey: "###############################",

  authDomain: "###############################",

  projectId: "########################",

  storageBucket: "#############################",

  messagingSenderId: "################################",

  appId: "######################################"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get database instance
const fireDb = getDatabase(app);

export default fireDb;


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCNznRIAQq_7eQjrPCFPq54HpUQ_2TP44k",
//   authDomain: "react-contact-865f8.firebaseapp.com",
//   projectId: "react-contact-865f8",
//   storageBucket: "react-contact-865f8.firebasestorage.app",
//   messagingSenderId: "982468323410",
//   appId: "1:982468323410:web:2a344aa812128ade65578b"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
