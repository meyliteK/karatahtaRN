// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//     apiKey: "AIzaSyCvodNKUX8gNqaAMkWsYeKx1K8bSYh2cng",
//     authDomain: "karatahtarn.firebaseapp.com",
//     projectId: "karatahtarn",
//     storageBucket: "karatahtarn.firebasestorage.app",
//     messagingSenderId: "484459487021",
//     appId: "1:484459487021:web:4faa28cb051e7ac71bfda4",
//     measurementId: "G-5TFWFWCX4P"
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export default app;

// firebase.js
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';

// const firebaseConfig = {
//     apiKey: "AIzaSyCvodNKUX8gNqaAMkWsYeKx1K8bSYh2cng",
//     authDomain: "karatahtarn.firebaseapp.com",
//     projectId: "karatahtarn",
//     storageBucket: "karatahtarn.firebasestorage.app",
//     messagingSenderId: "484459487021",
//     appId: "1:484459487021:web:4faa28cb051e7ac71bfda4",
//     measurementId: "G-5TFWFWCX4P"
// };

// // Initialize
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// export const auth = firebase.auth();
// export const db = firebase.firestore();


// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const firebaseConfig = {
//     apiKey: "AIzaSyCvodNKUX8gNqaAMkWsYeKx1K8bSYh2cng",
//     authDomain: "karatahtarn.firebaseapp.com",
//     projectId: "karatahtarn",
//     storageBucket: "karatahtarn.firebasestorage.app",
//     messagingSenderId: "484459487021",
//     appId: "1:484459487021:web:4faa28cb051e7ac71bfda4",
//     easurementId: "G-5TFWFWCX4P"
// };

// const app = initializeApp(firebaseConfig);

// // Burada Hermes çözümü için Auth manuel register ediliyor
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage)
// });

// const db = getFirestore(app);

// export { auth, db };


import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCvodNKUX8gNqaAMkWsYeKx1K8bSYh2cng",
    authDomain: "karatahtarn.firebaseapp.com",
    projectId: "karatahtarn",
    storageBucket: "karatahtarn.firebasestorage.app",
    messagingSenderId: "484459487021",
    appId: "1:484459487021:web:4faa28cb051e7ac71bfda4",
    easurementId: "G-5TFWFWCX4P"
    };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
