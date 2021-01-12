<template>
  <div>
    <h3>
      <h5 class="secret" v-for="secret in secrets" :key="secret.char_id">{{secret.name}}</h5>
      <h4>DU ER NÅ LOGGET IN</h4>
    </h3>
  </div>
</template>

<script>
import * as firebase from "firebase/app";

export default {
  data() {
    return {
      secrets: ""
    };
  },
  mounted() {
    this.getSecrets();
  },
  methods: {
    async getSecrets() {
      const token = await firebase.default.auth().currentUser.getIdToken();
      let config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      this.secrets = await this.$axios.get(
        "http://localhost:3000/erik",
        config
      );
      this.secrets = this.secrets.data;
    }
  }
};
</script>

<style>
div {
  color: inherit;
}
</style>