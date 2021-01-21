<template>
  <div>
    <h3>
      <h5 class="secret" v-for="secret in secrets" :key="secret.char_id">{{secret.name}}</h5>
      <h4>DU ER NÅ LOGGET IN</h4>
      {{ "Brukernavnet ditt er: " + brukerdata.providerData[0].email }}
    </h3>
  </div>
</template>

<script>
import * as firebase from "firebase/app";

export default {
  setup(){
    var brukerdata = firebase.default.auth().currentUser;
    return{
      brukerdata
    }
  }
};
</script>