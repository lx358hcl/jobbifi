<template>
  <nav ref = "nav" class="pr-3 navbar navbar-light navbar-expand-lg sticky-top bg-white d-flex d-sm-flex d-md-flex align-items-center align-content-center align-items-sm-end clean-navbar" id="" style="box-shadow: 0px 4px 6px 0px rgb(0 0 0 / 20%);padding: 2.2px 30px;padding-right: 30px;padding-left: 30px;border-bottom: 1px none var(--purple);padding-top: 13px;padding-bottom: 10px;">
    <div style="max-width: 1100px; " class="container">
      <a href = "/" class="d-flex align-items-center navbar-brand logo" to="/" style="font-family: 'Montez', cursive, serif; padding:0; margin:0;">
        <span style="font-size:40px;">jobbifi</span>
      </a>
      <div class="collapse navbar-collapse" id="navcol-1" style="font-family: Lato;letter-spacing: 1px;background: #ffffff;padding-left: 0;">
        <ul class="py-3 navbar-nav d-flex ml-auto mr-0" style="/*min-width: 100wh !Important;*/">
          <li class="nav-item d-flex align-items-center justify-content-end" style="padding-right: 0px;">
            <router-link class="hitLinks nav-link" to="/">HJEM</router-link>
          </li>
          <li class="nav-item d-flex align-items-center justify-content-end" style="padding-right: 0px;">
            <router-link class="nav-link hitLinks d-flex align-items-center justify-content-end" to="/stillinger">
              Stillinger
            </router-link>
          </li>
          <li class="nav-item d-flex align-items-center justify-content-end" style="padding-right: 0px;">
            <router-link class="nav-link hitLinks d-flex align-items-center justify-content-end" to="/besteselskaper">
              Beste selskaper
            </router-link>
          </li>
          <li>
            <router-link class="nav-link hitLinks d-flex align-items-center justify-content-end" to="/arrangementer">
              Events
            </router-link>
          </li>
          <li class="nav-item d-flex align-items-center justify-content-end" style="padding-right: 0px;">
            <router-link class="nav-link hitLinks" to="/feed">FEED</router-link>
          </li>
          <li class="nav-item d-flex align-items-center justify-content-end" style="padding-right: 0px;">
            <account class="account"></account>
            <router-link v-if="user" class="nav-link profile hitLinks" to="/konto">PROFIL</router-link>
          </li>
          <li class="nav-item d-flex align-items-center justify-content-end" style="padding-right: 0px;">
            <router-link v-if="user" to="/login" @click="logOut" class="nav-link profile hitLinks">LOGG UT</router-link>
          </li>
          <li v-if="!user" class="nav-item d-flex align-items-center justify-content-end" style="padding-right: 0px;">
            <router-link to="/login" class="nav-link profile hitLinks">LOGG IN</router-link>
          </li>
          <li v-if="!user" class="nav-item d-flex align-items-center justify-content-end" style="padding-right: 0px;">
            <router-link to="/blimedlem" class="nav-link profile hitLinks">BLI MEDLEM</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
  import { getInfo } from "../views/Secret.vue";
  import { ref, onUpdated, watch } from "vue";
  import account from "./account.vue";
  import router from '../router/index.js';
  import søkeFelt from './søkeFelt.vue';
  import notification from './notification.vue';
  import firebaseApp from "firebase";
  var user = ref("");
  var nav = ref(null)

  export default {
    setup() {
      onUpdated(() => {
        console.log(nav);
      })
      getInfo().then(e => {
        console.log(e);
        user.value = e;
      }).catch(function(error) {
        console.log("IDGAF");
      })
      //Logg ut funksjon
      function logOut() {
        firebaseApp.auth().signOut();
        window.location = window.location.origin + "/login";
      }
      return {
        account,
        user,
        logOut,
        søkeFelt,
        notification,
        nav,
      }
    }
  }
</script>
