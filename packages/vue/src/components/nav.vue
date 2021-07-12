<template>
  <nav ref="nav" :class = "{'fixed-top': $router.currentRoute.value.path == '/'}" class="m-0 p-0 w-100 container-fluid py-0 navbar navbar-light navbar-expand-lg d-flex d-sm-flex d-md-flex align-items-center align-content-center align-items-sm-end clean-navbar justify-content-center">
    <div class="row w-100">
      <div :class="{venstreSide: $router.currentRoute.value.path == '/dashboard'}" class="col-2 py-2 px-0 d-flex justify-content-center m-0 p-0">
        <a href="/" class="d-flex align-items-center navbar-brand font-weight-bold" to="/" style="font-family: 'Dancing Script', cursive, serif; padding:0; margin:0;">
          <span class = "logo">jobbifi</span>
        </a>
      </div>
      <div class="col-9 d-flex justify-content-end m-0 p-0">
        <div class = "container-fluid">
          <div v-bind:style="{ visibility: $router.currentRoute.value.path == '/' ? 'hidden' : 'visible' }" class = "col-2 d-flex align-items-center m-0">
            <form class = "m-0 d-flex align-items-center">
              <div class="form-group m-0">
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Søk jobbifi">
              </div>
            </form>
          </div>
        <div class="container col-10 m-0 p-0">
          <div class="collapse navbar-collapse d-flex justify-content-end" id="navcol-1" style="font-family: Lato;letter-spacing: 1px;padding-left: 0;">
            <ul class="py-3 navbar-nav" style="/*min-width: 100wh !important;*/">
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
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  import {
    getInfo
  } from "../views/Secret.vue";
  import {
    ref,
    onUpdated,
    watch
  } from "vue";
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

      })
      getInfo().then(e => {
        user.value = e;
      }).catch(function(error) {

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
