<template>
  <div>
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
      <div class="pass">
        <input type="password" v-model="password" placeholder="password" />
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
<<<<<<< HEAD
  import firebase from "../main.js";  
=======
  import appen from "../main.js";  
>>>>>>> cd212d7ffbb92ecee196d5f29f80185a3347af93
  import { ref } from "vue";
  export default {
    setup() {
      async function run(){
<<<<<<< HEAD
        var db = await firebase.firestore();
=======
        var db = await appen.firestore();
>>>>>>> cd212d7ffbb92ecee196d5f29f80185a3347af93
        var dbRes = await db.collection("users").get();
        dbRes.docs.forEach(e => console.log(e.data()))
        var igor = {
          "navn": "igor",
          "alder": 20,
          "venner": []
        }
        var luka = {
          "navn": "luka",
          "alder": 24,
          "venner": []
        }
        var data = {
          "navn": "thomas",
          "alder": 13,
          "venner": [luka, igor]
        }
        db.collection("users").doc("3").set(data);
        dbRes.docs.forEach(e => console.log(e.data()))
      }
      run();

      var email = ref("");
      var password = ref("");
      var displayName = ref("");
      var fornavn = ref(""); 

      async function bliMedlem() {
        await firebase.default.auth().createUserWithEmailAndPassword(email.value, password.value);
        window.location = window.location.origin + "/stillinger";
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