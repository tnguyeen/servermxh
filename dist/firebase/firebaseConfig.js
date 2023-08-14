"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseStorage = void 0;
// Import the functions you need from the SDKs you need
const app_1 = require("firebase/app");
const storage_1 = require("firebase/storage");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB8IDcvGphH1EYKT7blfePECjBjRr94LeI",
    authDomain: "winged-ray-395216.firebaseapp.com",
    projectId: "winged-ray-395216",
    storageBucket: "winged-ray-395216.appspot.com",
    messagingSenderId: "757317812275",
    appId: "1:757317812275:web:aede8d87bbc28600a4e346",
    measurementId: "G-52CR5VZ3P7",
};
// Initialize Firebase
const app = (0, app_1.initializeApp)(firebaseConfig);
// Initialize Cloud Storage and get a reference to the service
exports.firebaseStorage = (0, storage_1.getStorage)(app);
