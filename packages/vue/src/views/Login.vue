<template>
  <div>
    <h3>Login</h3>
    <form v-on:submit.prevent="login($submit)">
      <div class="">
        <input type="text" placeholder="login" v-model="email" />
      </div>
      <div class="password">
        <input type="password" placeholder="password" v-model="password" />
      </div>
      <button>Login</button>
    </form>
    <div class="error" v-if="error">{{error.message}}</div>
  </div>
</template>

<script>
import * as firebase from "firebase/app";

export default {
  setup(){
    function login(e){
      console.log("running");
      console.log(e)
      firebase.default.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(data => {
          console.log(data);
          this.$router.replace({ name: "secret" });
        })
        .catch(error => {
          this.error = error;
        });
    }
    return {
      login,
    }
  }
};
</script>
