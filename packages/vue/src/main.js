import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyA3LSpqNdQBBIHL03oVvx1GF32c8voqzIQ",
    authDomain: "thisone-f7a65.firebaseapp.com",
    projectId: "thisone-f7a65",
    storageBucket: "thisone-f7a65.appspot.com",
    messagingSenderId: "214201865664",
    appId: "1:214201865664:web:1d33068a8a408eec54e425"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

createApp(App).use(router).mount('#app');