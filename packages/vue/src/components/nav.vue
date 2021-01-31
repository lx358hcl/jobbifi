<template>
  <nav class="ekteNav navbar sticky-top navbar-light navbar-expand-sm d-flex align-items-center">
   
    <div class="container-xl justify-content-center">
      <div class = "d-flex justify-content-around navIndreContainer">

      <!-- Logo -->
      <router-link id="logo" class="mt-0 navbar-brand" to="/">&</router-link>

      <!-- Toggle knappen ved expand -->
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#toggler"
        aria-controls="toggler"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navbaren selv -->
      <div class="collapse navbar-collapse" id="toggler">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item d-flex align-items-center">
            <router-link class="nav-link titles" to="/">
              HJEM
            </router-link>
          </li>
          <li class="nav-item titles d-flex align-items-center">
            <router-link class="nav-link" to="/stillinger">
              STILLINGER
            </router-link>
            <span class="antallBadgeRød badge badge-danger">
              {{ allJobs.length }} 
            </span>
          </li>
          <li class="nav-item titles">
            <router-link class="nav-link" to="/om">
              HVA ER DETTE?
            </router-link>
          </li>
          <li class="nav-item d-flex align-items-center">
            <account />
          </li>
        </ul>
      </div>

      </div>

    </div>

  </nav>
</template>

<script>
  var allJobs = require("../../../api/data/data.json").jobs;
  import account from "./account.vue";
  import * as firebase from "firebase/app";
	import router from '../router/index.js';
  export default {
    setup() {
      return {
        allJobs,
        account,
        firebase,
      }
    }
  }
</script>
