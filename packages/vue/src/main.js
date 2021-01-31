import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import firebase from "firebase/app";

var firebaseConfig = {
  apiKey: "AIzaSyAh0HDRFkHxT5rg1axASthIAEkWfyUuR3Y",
  authDomain: "nevet-9e3ed.firebaseapp.com",
  projectId: "nevet-9e3ed",
  storageBucket: "nevet-9e3ed.appspot.com",
  messagingSenderId: "108502587373",
  appId: "1:108502587373:web:5cd48d209d9171076379e4"
};

<<<<<<< HEAD
firebase.initializeApp(firebaseConfig);
=======
var appen = firebase.initializeApp(firebaseConfig);
>>>>>>> cd212d7ffbb92ecee196d5f29f80185a3347af93

firebase.auth().onAuthStateChanged(user => {
  createApp(App).use(router).mount('#app');
});

<<<<<<< HEAD
export default firebase;
=======
export default appen;
>>>>>>> cd212d7ffbb92ecee196d5f29f80185a3347af93
