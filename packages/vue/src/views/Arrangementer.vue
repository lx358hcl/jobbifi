<template>
  <main class="container-fluid m-0 p-0 pt-2">

    <nav class="navbar navbar-expand søkeNav navbar-light m-0 p-0 ">
      <div class="collapse navbar-collapse" id="navbarNav">
        <div style="max-width:1400px;" class="container">
          <ul class="navbar-nav">
            <li class="nav-item active søkebarNav">
              <a class="nav-link" href="#">Alle</a>
            </li>
            <li class="nav-item søkebarNav">
              <a class="nav-link" href="#">Ifinavet</a>
            </li>
            <li class="nav-item søkebarNav">
              <a class="nav-link" href="#">Tekna</a>
            </li>
            <li class="nav-item søkebarNav">
              <a class="nav-link" href="#">Stillinger</a>
            </li>
            <li class="nav-item søkebarNav">
              <a class="nav-link" href="#">Sosialt</a>
            </li>
            <li class="nav-item søkebarNav">
              <a class="nav-link" href="#">Politisk</a>
            </li>
            <li class="nav-item søkebarNav">
              <a class="nav-link" href="#">Annet</a>
            </li>
            <!-- <li class="nav-item søkebarNav">
              <a class="nav-link" href="#">Utløpt</a>
            </li> -->

            <VueTailwindPicker></VueTailwindPicker>

          </ul>
        </div>
      </div>
    </nav>

    <div style="max-width:1400px; margin-bottom:100px;" class="container">
      <div class="row">
        <div class="col-3 pr-0">
          <h4 class="card-title filterTittel pt-4 pb-2 mb-0">Filtrer resultatene:</h4>
          <div class="søknadsfrist">
            <p class="card-title filtertypeTittel mb-2 mt-3">Dato</p>
            <ul class="list-group list-group-flush">
              <li class="list-group-item border-0 filter p-0 ml-1">
                <input id="frist1" class="gjørTilClickable" type="radio" name="frist">
                <label for="frist1" class="pl-2 mb-1 gjørTilClickable">Under en uke <span
                    class="filterAntall">({{ }})</span></label>
              </li>
            </ul>
          </div>
          <div class="kurstype">
            <p class="card-title filtertypeTittel mb-2 mt-3">Kurstype</p>
            <ul class="list-group list-group-flush">
              <li class="list-group-item border-0 filter p-0 ml-1">
                <input type="checkbox" id="deltid">
                <label class="pl-2 mb-1" for="deltid">{{ }} <span
                    class="filterAntall">(96)</span></label>
              </li>
            </ul>
          </div>
          <div class="fagtype">
            <p class="card-title filtertypeTittel mb-2 mt-3">Fagtype</p>
            <ul class="list-group list-group-flush">
              <li class="list-group-item border-0 filter p-0 ml-1">
                <input type="checkbox" id="deltid">
                <label class="pl-2 mb-1" for="deltid">{{ }} <span
                    class="filterAntall">(96)</span></label>
              </li>
            </ul>
          </div>
          <div class="åpen">
            <p class="card-title filtertypeTittel mb-2 mt-3">Åpent arrangement</p>
            <ul class="list-group list-group-flush">
              <li class="list-group-item border-0 filter p-0 ml-1">
                <input type="checkbox" id="deltid">
                <label class="pl-2 mb-1" for="deltid">{{ }} <span
                    class="filterAntall">(96)</span></label>
              </li>
            </ul>
          </div>
          <div class="plass">
            <p class="card-title filtertypeTittel mb-2 mt-3">Plass</p>
            <ul class="list-group list-group-flush">
              <li class="list-group-item border-0 filter p-0 ml-1">
                <input type="checkbox" id="deltid">
                <label class="pl-2 mb-1" for="deltid">{{ }} <span
                    class="filterAntall">(96)</span></label>
              </li>
            </ul>
          </div>
          <div class="mat">
            <p class="card-title filtertypeTittel mb-2 mt-3">Mat</p>
            <ul class="list-group list-group-flush">
              <li class="list-group-item border-0 filter p-0 ml-1">
                <input type="checkbox" id="deltid">
                <label class="pl-2 mb-1" for="deltid">{{  }} <span
                    class="filterAntall">(96)</span></label>
              </li>
            </ul>
          </div>
          <div class="fullt">
            <p class="card-title filtertypeTittel mb-2 mt-3">Fullt</p>
            <ul class="list-group list-group-flush">
              <li class="list-group-item border-0 filter p-0 ml-1">
                <input type="checkbox" id="deltid">
                <label class="pl-2 mb-1" for="deltid">{{  }} <span
                    class="filterAntall">(96)</span></label>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-9">
          <div class="container mt-4 p-0">
            <div class="card">
              <div class="card-body py-0 pr-2">
                <div class="row">
                  <div class="col-8">
                    <p class="font-weight-bold mb-0 mt-2">Fant {{  }} resultater </p>
                    <p class="mt-2 mb-2">Du søkte etter: <span class="font-italic font-weight-bold">{{  }}</span> </p>
                  </div>
                  <div class="col-4 d-flex align-items-center pr-0 justify-content-end">
                    <div style="" class="btn-group w-100 d-flex align-items-center pr-3 justify-content-end">
                      <button style="min-width:150px; border: 1px solid #dfdfdf !important;"
                        class="border-0 bg-light rounded p-3 dropdown-toggle" type="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        Sortering
                      </button>
                      <div style="max-width: 100px;" class="dropdown-menu w-100">
                        <ul class="pl-4 ml-2 my-auto">
                          <li>
                            <input class="form-check-input gjørTilClickable" type="radio" name="sorteringAvStillinger"
                              id="nyesteFørst" value="nyesteFørst" checked>
                            <label class="form-check-label gjørTilClickable" for="nyesteFørst">
                              Nyeste først
                            </label>
                          </li>
                          <li>
                            <input class="form-check-input gjørTilClickable" type="radio" name="sorteringAvStillinger"
                              id="eldsteFørst" value="eldsteFørst">
                            <label class="form-check-label gjørTilClickable" for="eldsteFørst">
                              Eldste først
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="container my-0 p-2 d-flex justify-content-start">
            <div class="row">
              <div v-for="event in data" :key="event.id"  class="col-sm-6 col-lg-4 p-2">
                <div style="min-height:480px;" class="boksen card">
                  <div style="width:100%; height:180px;" class="d-flex align-items-center card-img my-auto mx-auto">
                    <img :src="event.bilde" style="width:60%; max-height:125px;" class="my-auto mx-auto card-img-top pt-4"
                      alt="Card image cap">
                  </div>
                  <div style="min-height:360px; max-height:360px;" class="card-body">
                    <hr class="mt-0">
                    <div class="stilling">
                      <h5 class="card-title font-weight-bold">{{ event.heading }}</h5>
                      <div style="min-height: 170px; max-height:150px;" class="card-text">
                        {{ event.description }}</div>
                    </div>
                    <div style="position:absolute; bottom: 8px;"
                      class="px-2 d-flex justify-content-center align-items-center">
                      <span class="frist text-danger pr-2">Dato: {{ event.riktigDato }}</span>
                      <div class="søkeButton card-1 d-flex justify-content-center align-items-center ml-3">
                        <a :href="event.url" style="height:35px; width:100px; line-height:21px;" class="btn btn-primary">SØK</a>
                      </div>
                      <div class="more">
                        <a class="more" href="#">
                          <i class="fas fa-ellipsis-h"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
  import { ref, reactive } from "vue";
  var settings = require("../settings.js").settings;
  var axios = require("axios");
  var data = ref("");
  export default {
    setup() {
      //Ved component-loading, call API-en og finnantall stillinger etc.
      //API-call basert på settings
      function axiosMe() {
        axios.get(
            `http://localhost:3000/api/events`
          )
          .then(function (response) {
            console.log(response.data);
            data.value = response.data;
          })
          .catch(function (error) {
            return error;
          });
      }
      axiosMe();
      return{
        data
      }
    }
  }
</script>