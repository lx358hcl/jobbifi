<template>
  <div>
    <h3>Login</h3>
    <form v-on:submit.prevent="login()">
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input v-model="email"  type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
      </div>
      <div class="error" v-if="error">{{ error.message }}</div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
  import * as firebase from "firebase/app";
  import {
    ref
  } from "vue";
  export default {
    setup() {
      var email = ref("");
      var password = ref("");
      function login() {
        console.log(password);
        firebase.default.auth()
          .signInWithEmailAndPassword(email.value, password.value)
          .then(data => {
            window.location = window.location.origin + "/";
          })
          .catch(error => {
            error.value = error;
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
