<template>
  <div>
    <div class="error" v-if="error">{{error.message}}</div>
    <form @submit.prevent="bliMedlem();">
      Register
      <div class="email">
        <input type="email" v-model="email" placeholder="email" />
      </div>
      <div class="navn">
        <input type="text" v-model="displayName" placeholder="navn" />
      </div>
       <div class="fornavn">
        <input type="text" v-model="fornavn" placeholder="fornavn" />
      </div>
      <div class="password">
        <input type="password" v-model="password" placeholder="password" />
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
  import * as firebase from "firebase/app";
  import { ref } from "vue";
  export default {
    setup() {
      var email = ref("");
      var password = ref("");
      var displayName = ref("");
      var fornavn = ref("");
      function bliMedlem() {
        firebase.default.auth().createUserWithEmailAndPassword(email.value, password.value)
          .then(() => {
            var user = firebase.default.auth().currentUser;
            user.updateProfile({displayName: displayName.value, fornavn: fornavn.value }).then(function() {
              }).catch(function(error) {

              });
            user.sendEmailVerification().then(function() {
              console.log("sendte en email verification");
            }).catch(function(error) {
              console.log("Failed");
            });
          })
          .catch(error => (this.error = error));
      }
      return {
        bliMedlem,
        email,
        password,
        displayName,
        fornavn,
      }
    }
  }
</script>