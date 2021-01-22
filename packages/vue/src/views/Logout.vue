<template>
  <div>
    <h3>
        Du er logget ut
    </h3>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import router from "../router/index.js";

export default {
  setup() {
    firebase.default.auth().signOut().then(() => {
        console.log("logget ut");
    }).catch((error) => {
        console.log("det skjedde en feil");
    });
  },
};
</script>
