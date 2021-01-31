<template>
<<<<<<< HEAD
  <nav class="ekteNav navbar sticky-top navbar-light navbar-expand-sm d-flex align-items-center">
   
    <div class="container-xl justify-content-center">
      <div class = "d-flex justify-content-around navIndreContainer">

      <!-- Logo -->
      <router-link id="logo" class="mt-0 navbar-brand" to="/">&</router-link>

      <!-- Toggle knappen ved expand -->
=======
  <nav class="ekteNav navbar sticky-top navbar-light navbar-expand-xl d-flex align-items-center">
    <div style="max-width: 1400px" class="container">
      <router-link id="logo" class="mt-0 navbar-brand" to="/">&
        <p
          class="p-0 m-0"
          style="
            display: inline-block;
            position: relative;
            top: -5px;
            font-family: inherit;
          ">
          </p
      ></router-link>

      <!-- <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2 search" v-on:keydown.enter="onEnter($event)" v-on:input="changeSettings($event);"
          style="font-family: FontAwesome;" placeholder="&#xF002; Søk" aria-label="Search">
      </form> -->

>>>>>>> cd212d7ffbb92ecee196d5f29f80185a3347af93
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
<<<<<<< HEAD
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
=======
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item d-flex align-items-center">
            <router-link
              class="nav-link titles"
              to="/"
              v-bind:class="{ active: $route.path == '/' }"
              >HJEM</router-link>
          </li>

          <li class="nav-item titles d-flex align-items-center">
            <router-link
              class="nav-link"
              to="/stillinger"
              v-bind:class="{ active: $route.path == '/stillinger' }"
              >STILLINGER
            </router-link>
            <span
                style="
                  position: relative;
                  bottom: 10px;
                  padding-top: 3px;
                  padding-right: 3px;
                  right: 3px;
                  padding-left: 5px;
                  border-radius: 20px;
                "
                class="badge badge-danger"
                >{{ hovedData.jobs.length }}</span>
          </li>
          <li class="nav-item titles">
            <router-link
              class="nav-link"
              to="/om"
              v-bind:class="{ active: $route.path == '/om' }"
              >HVA ER DETTE?
              <span
                style="
                  position: relative;
                  bottom: 10px;
                  padding-top: 3px;
                  padding-right: 3px;
                  right: 3px;
                  padding-left: 5px;
                  border-radius: 20px;
                "
                class="badge badge-danger"
                >{{  }}</span
              >
            </router-link>
          </li>

          <li class="nav-item titles d-flex align-items-center">
>>>>>>> cd212d7ffbb92ecee196d5f29f80185a3347af93
            <account />
          </li>
        </ul>
      </div>
<<<<<<< HEAD

      </div>

    </div>

=======
    </div>
>>>>>>> cd212d7ffbb92ecee196d5f29f80185a3347af93
  </nav>
</template>

<script>
<<<<<<< HEAD
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
=======
var hovedData = require("../../../api/data/data.json");
import account from "./account.vue";
import * as firebase from "firebase/app";

export default {
  setup() {
    return {
      hovedData,
      account,
      firebase,
    };
  },
};
>>>>>>> cd212d7ffbb92ecee196d5f29f80185a3347af93
</script>
