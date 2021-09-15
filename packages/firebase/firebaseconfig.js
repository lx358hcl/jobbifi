import firebase from "firebase";

var firebaseConfig = {
    apiKey: process.env.VUE_APP_APIKEY,
    authDomain: process.env.VUE_APP_AUTHDOMAIN,
    databaseURL: process.env.VUE_APP_DATABASE_URL,
    projectId: process.env.VUE_APP_PROJECT_ID,
    storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_MESSAGESENDERID,
    appId: process.env.VUE_APP_APPID,
};

//Initialiser firebase
var firebaseApp = firebase.default.initializeApp(firebaseConfig);

export default firebaseApp;