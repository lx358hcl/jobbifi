<template>
  <nav ref="nav" :class="{'fixed-top': $router.currentRoute.value.path == '/'}" class="zoom clean-navbar container-fluid m-0 p-0">
    <div class="row w-100 d-flex justify-content-center m-0">
      <div :class="{venstreSide: $router.currentRoute.value.path == '/dashboard'}" class="col-2 col-sm-2 col-md-2 col-lg-2 m-0 p-0">
        <router-link to="/" class="d-flex align-items-center navbar-brand font-weight-bold justify-content-center" style="font-family: 'Dancing Script', cursive, serif; padding:0; margin:0;">
          <span class="logo text-dark d-none d-lg-block">jobbifi</span>
          <span class="logo text-dark d-block d-lg-none">j</span>
        </router-link>
      </div>
      <div class="col-10 col-sm-10 col-md-10 col-lg-10 d-flex justify-content-end m-0 p-0">
        <div class="container-fluid m-0 p-0">
          <div v-bind:style="{ visibility: $router.currentRoute.value.path == '/' ? 'hidden' : 'visible' }" class="col-2 d-flex align-items-center m-0">
            <form class="m-0 d-flex align-items-center">
              <div class="form-group m-0">
              </div>
            </form>
          </div>
          <div class="container col-11 m-0 p-0">
            <div class="d-flex justify-content-end" id="navcol-1" style="font-family: Lato;letter-spacing: 1px;padding-left: 0;">
              <ul class="py-3 navbar-nav" style="flex-direction:row; /*min-width: 100wh !important;*/">
                <li class="nav-item d-flex align-items-center justify-content-end px-2" style="padding-right: 0px;">
                  <router-link class="nav-link text-dark hitLinks d-flex align-items-center justify-content-end" to="/stillinger">
                    Stillinger
                  </router-link>
                </li>
                <li class="nav-item d-flex align-items-center justify-content-end px-2" style="padding-right: 0px;">
                  <router-link class="nav-link hitLinks text-dark" to="/feed">FEED</router-link>
                </li>
                <li class="nav-item d-flex align-items-center justify-content-end px-0 " style="padding-right: 0px;">
                  <account class="account"></account>
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
