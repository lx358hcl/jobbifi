<template>
  <nav class="ekteNav navbar sticky-top navbar-light navbar-expand-xl mt-2">
    <div style="max-width: 1400px" class="container">
      <a id="logo" class="mt-0 navbar-brand" href="/"
        >&
        <p
          class="p-0 m-0"
          style="
            display: inline-block;
            position: relative;
            top: -5px;
            font-family: inherit;
          "
        ></p
      ></a>

      <!-- <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2 search" v-on:keydown.enter="onEnter($event)" v-on:input="changeSettings($event);"
          style="font-family: FontAwesome;" placeholder="&#xF002; Søk" aria-label="Search">
      </form> -->

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
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
            <a
              class="nav-link titles"
              href="/"
              v-bind:class="{ active: $route.path == '/' }"
              >HJEM</a
            >
          </li>

          <li class="nav-item titles d-flex align-items-center">
            <a
              class="nav-link"
              href="/stillinger"
              v-bind:class="{ active: $route.path == '/stillinger' }"
              >STILLINGER
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
                >{{ hovedData.jobs.length }}</span
              >
            </a>
          </li>
          <li class="nav-item titles">
            <a
              class="nav-link"
              href="/om"
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
            </a>
          </li>

          <li class="nav-item titles">
            <a class="nav-link" href="/kontakt"
              v-bind:class="{'active': $route.path == '/arrangementer'}">OM OSS
           
            </a>
          </li>

          <li class="nav-item titles">
            <a
              class="nav-link"
              href="/blimedlem"
              v-bind:class="{ active: $route.path == '/blimedlem' }"
              >BLI MEDLEM</a
            >
          </li>


          <li class="nav-item titles d-flex align-items-center">
            <account />
            <!-- <a
              class="nav-link"
              href="/login"
              v-bind:class="{ active: $route.path == '/login' }"
              >LOGIN</a
            > -->
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
var hovedData = require("../../../api/data/data.json");
import account from "./account.vue";
export default {
  setup() {
    return {
      hovedData,
      account
    };
  },
};
</script>
