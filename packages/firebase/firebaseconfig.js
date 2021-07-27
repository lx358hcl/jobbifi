import firebase from "firebase";
import dotenv from "dotenv";
dotenv.config({ silent: process.env.NODE_ENV === 'production' });

var firebaseConfig = process.env.FIREBASECONFIG;

//Initialiser firebase
var firebaseApp = firebase.default.initializeApp(firebaseConfig);

export default firebaseApp;