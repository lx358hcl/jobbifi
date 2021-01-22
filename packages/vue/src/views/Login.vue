<template>
  <div>
    <h3>Login</h3>
    <form v-on:submit.prevent="login()">
      <div class="">
        <input type="text" placeholder="login" v-model="email" />
      </div>
      <div class="password">
        <input type="password" placeholder="password" v-model="password" />
      </div>
      <button>Login</button>
    </form>
    <div class="error" v-if="error">{{ error.message }}</div>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import { ref } from "vue";
import router from "../router/index.js";

export default {
  setup(){
    var email = ref("");
    var password = ref("");
    function login(){
      firebase.default.auth()
        .signInWithEmailAndPassword(email.value, password.value)
        .then(data => {
          console.log(data);
          console.log("running");
          router.push({ path: "/stillinger" });
        })
        .catch(error => {
          this.error = error;
        });
    }
    return {
      login,
      email,
      password,
    }
  }
}
</script>
