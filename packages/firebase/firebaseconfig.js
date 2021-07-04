import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyAh0HDRFkHxT5rg1axASthIAEkWfyUuR3Y",
  authDomain: "nevet-9e3ed.firebaseapp.com",
  databaseURL: "https://nevet-9e3ed-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "nevet-9e3ed",
  storageBucket: "nevet-9e3ed.appspot.com",
  messagingSenderId: "108502587373",
  appId: "1:108502587373:web:5cd48d209d9171076379e4"
};

//Initialiser firebase
var firebaseApp = firebase.default.initializeApp(firebaseConfig);

export default firebaseApp;