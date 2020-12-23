<template>
  <nav style="margin-bottom: 0 !important;" class="navbar sticky-top navbar-light bg-light navbar-expand-xl mb-0">
    <div style="max-width: 1400px;" class="container">

      <a id="logo" class="navbar-brand" href="/">&</a>

      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2 search" v-on:input="changeSettings($event);"
          style="font-family: FontAwesome;" placeholder="&#xF002; Søk" aria-label="Search">
      </form>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">

          <li class="nav-item">
            <a class="nav-link titles" href="/" v-bind:class="{'active': $route.path == '/'}">HJEM</a>
          </li>

          <li class="nav-item titles">
            <a class="nav-link" href="/stillinger" v-bind:class="{'active': $route.path == '/stillinger'}">STILLINGER
              <span
                style="position: relative; bottom: 10px; padding-top: 3px; padding-right: 3px; right: 3px; padding-left: 5px; border-radius: 20px;"
                class="badge badge-danger">{{ hovedData.jobs.length }}</span>
            </a>
          </li>

          <li class="nav-item titles">
            <a class="nav-link" href="/arrangementer"
              v-bind:class="{'active': $route.path == '/arrangementer'}">ARRANGEMENTER
              <span
                style="position: relative; bottom: 10px; padding-top: 3px; padding-right: 3px; right: 3px; padding-left: 5px; border-radius: 20px;"
                class="badge badge-danger">{{ hovedData.ifievents.length + hovedData.tekna.length }}</span>
            </a>
          </li>

          <li class="nav-item titles">
            <a class="nav-link" href="/blimedlem" v-bind:class="{'active': $route.path == '/blimedlem'}">BLI MEDLEM</a>
          </li>

          <li class="nav-item titles">
            <a class="nav-link" href="/login" v-bind:class="{'active': $route.path == '/login'}">LOGIN</a>
          </li>

        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
  import {
    settings,
    data
  } from "../views/Stillinger.vue";
  var axios = require("axios");

  var hovedData = require("../../../api/data/data.json");

  export default {
    setup() {

      function axiosMe() {
        console.log("axiosing");
        console.log(settings.value);
        axios.get(
            `http://localhost:3000/api/jobs?type=${settings.value.type.join("+")}&sort=${settings.value.sort}&tekno=${settings.value.tekno.join("+")}&frist=${settings.value.frist}&search=${settings.value.search}`
          )
          .then(function (response) {
            console.log(response.data);
            data.value = response.data;
          })
          .catch(function (error) {
            return error;
          });
      }

      function changeSettings(e) {
        console.log("OK");
        var temp = e.target.value.split(" ").filter(e => e);
        settings.value.search = temp.join("+");
        axiosMe();
      }

      return {
        hovedData,
        changeSettings,
      }
    }
  }
</script>