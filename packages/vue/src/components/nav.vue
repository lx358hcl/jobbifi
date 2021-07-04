<template>
  <nav ref = "nav" class="pr-3 navbar navbar-light navbar-expand-lg sticky-top bg-white d-flex d-sm-flex d-md-flex align-items-center align-content-center align-items-sm-end clean-navbar" id="" style="box-shadow: 0px 4px 6px 0px rgb(0 0 0 / 20%);padding: 2.2px 30px;padding-right: 30px;padding-left: 30px;border-bottom: 1px none var(--purple);padding-top: 13px;padding-bottom: 10px;">
    <div style="max-width: 1100px; " class="container">
      <router-link class="d-flex align-items-center navbar-brand logo" to="/" style="font-family: 'Goudy Bookletter 1911', serif;font-weight: bold; padding:0; margin:0;">
        <span class="animate__animated animate__slower animate__swing" style="font-size:40px;">&amp;</span>
      </router-link>
      <button data-toggle="collapse" class="navbar-toggler" data-target="#navcol-1">
        <span class="sr-only">
          Toggle navigation
        </span>
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navcol-1" style="font-family: Lato;letter-spacing: 2px;background: #ffffff;padding-left: 0;">
        <ul class="py-3 navbar-nav d-flex ml-auto mr-0" style="/*min-width: 100wh !Important;*/">
          <li class="nav-item d-flex align-items-center justify-content-end" style="padding-right: 0px;">
            <router-link class="hitLinks nav-link" to="/">HJEM</router-link>
          </li>
          <li class="nav-item d-flex align-items-center justify-content-end" style="padding-right: 0px;">
            <router-link class="nav-link hitLinks d-flex align-items-center justify-content-end" to="/stillinger">
              Stillinger
              <span class="badge badge-primary" style="margin: 0px;margin-top: 0px;margin-left: 5px;line-height: 12px;font-size: 10px;background: var(--red);text-align: right;padding-left: 5px;padding-bottom: 3.5px;border-radius: 27px;">42</span>
            </router-link>
          </li>
          <li class="nav-item d-flex align-items-center justify-content-end" style="padding-right: 0px;">
            <router-link class="nav-link hitLinks d-flex align-items-center justify-content-end" to="/stillinger">
              Beste selskaper
            </router-link>
          </li>
          <li>
            <router-link class="nav-link hitLinks d-flex align-items-center justify-content-end" to="/arrangementer">
              Events
              <span class="badge badge-primary" style="margin: 0px;margin-top: 0px;margin-left: 5px;line-height: 12px;font-size: 10px;background: var(--red);text-align: right;padding-left: 5px;padding-bottom: 3.5px;border-radius: 27px;">28</span>
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
