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

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(user => {
  createApp(App).use(router).mount('#app');
});

export default firebase;