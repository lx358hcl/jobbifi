<template>
  <div>
    <h3>
      <h5 class="secret" v-for="secret in secrets" :key="secret.char_id">{{secret.name}}</h5>
      <h4>DU ER NÅ LOGGET IN</h4>
      {{ "Brukernavnet ditt er: " + name }} <br> {{ "fornavnet ditt er: " + fornavn }} <br> {{ "Eposten din er: " + email }}<br> {{ "photoUrl ditt er: " + photoUrl }}<br> {{ "emailVerified ditt er: " + emailVerified }}<br> {{ "uid ditt er: " + uid }}<br> {{ "token ditt er: " + token }}<br>
    </h3>
  </div>
</template>

<script>
  import { ref } from "vue";
  import firebase from "../main.js";
  console.log("dette er appen");

  export default {
    setup() {
      var user = firebase.default.auth().currentUser;
      var name = ref("");
      var email = ref("");
      var photoUrl = ref("");
      var emailVerified = ref("");
      var uid = ref("");
      var token = ref("");
      var fornavn = ref("");
      console.log(user);
      // The user's ID (uid), unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
      async function getInfo() {
        if (user != null) {
          name.value = user.displayName;
          console.log(name.value);
          email.value = user.email;
          photoUrl.value = user.photoURL;
          emailVerified.value = user.emailVerified;
          uid.value = user.uid;
          token.value = null;
          fornavn.value = user.fornavn;
          console.log(token);
          await firebase.default.auth().currentUser.getIdToken().then((data) => {
            return token.value = data;
          });
        }
      }
      getInfo();
      return {
        name,
        email,
        photoUrl,
        uid,
        token,
        emailVerified,
      }
    }
  };
</script>