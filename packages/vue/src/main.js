import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import firebaseApp from "../../firebase/firebaseconfig.js";

firebaseApp.auth().onAuthStateChanged(user => {
  createApp(App).use(router).mount('#ifijobbApp');
});

export default router;