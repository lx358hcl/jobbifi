<template>
  <main class="container-fluid m-0 p-0">
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
            <li class="nav-item søkebarNav">
              <a class="nav-link" href="#">Utløpt</a>
            </li>

          </ul>
        </div>
      </div>

    </nav>
    <div style="max-width:1400px; margin-bottom:100px;" class="container">
      <div class="row">
        <div class="col-3 pr-0">
          <h4 class="card-title filterTittel pt-4 pb-0 mb-0">Filtrer resultatene:</h4>
          <div class="jobbtype">
            <p class="card-title filtertypeTittel mb-2 mt-3">Heltid/deltid</p>
            <ul class="list-group list-group-flush">
              <li class="list-group-item border-0 filter p-0 ml-1">
                <input type="checkbox" id="deltid">
                <label class="pl-2 mb-1" for="deltid">Deltid <span class="filterAntall">(960)</span></label>
              </li>
              <li class="list-group-item border-0 filter p-0 ml-1">
                <input type="checkbox" id="deltid">
                <label class="pl-2 mb-1" for="deltid">Internship <span class="filterAntall">(1029)</span></label>
              </li>
              <li class="list-group-item border-0 filter p-0 ml-1">
                <input type="checkbox" id="deltid">
                <label class="pl-2 mb-1" for="deltid">Heltid <span class="filterAntall">(401)</span></label>
              </li>
            </ul>
          </div>
          <div class="firma">
            <p class="card-title filtertypeTittel mb-2 mt-3">Firma</p>
            <ul class="list-group list-group-flush">
              <li class="list-group-item border-0 filter p-0 ml-1">
                <input type="checkbox" id="deltid">
                <label class="pl-2 mb-1" for="deltid">NRK <span class="filterAntall">(96)</span></label>
              </li>
              <li class="list-group-item border-0 filter p-0 ml-1">
                <input type="checkbox" id="deltid">
                <label class="pl-2 mb-1" for="deltid">Netcompany <span class="filterAntall">(1029)</span></label>
              </li>
              <li class="list-group-item border-0 filter p-0 ml-1">
                <input type="checkbox" id="deltid">
                <label class="pl-2 mb-1" for="deltid">Knowit <span class="filterAntall">(148)</span></label>
              </li>
              <li class="list-group-item border-0 filter p-0 ml-1">
                <input type="checkbox" id="deltid">
                <label class="pl-2 mb-1" for="deltid">Iterate <span class="filterAntall">(1923)</span></label>
              </li>
              <li class="list-group-item border-0 filter p-0 ml-1">
                <input type="checkbox" id="deltid">
                <label class="pl-2 mb-1" for="deltid">Skatteetaten <span class="filterAntall">(19)</span></label>
              </li>
            </ul>
          </div>
          <div class="ferdigheter">
            <p class="card-title filtertypeTittel mb-2 mt-3">Ferdigheter</p>
            <ul class="list-group list-group-flush">
              <li class="list-group-item border-0 filter p-0 ml-1">
                <input type="checkbox" id="deltid">
                <label class="pl-2 mb-1" for="deltid">React <span class="filterAntall">(18)</span></label>
              </li>
              <li class="list-group-item border-0 filter p-0 ml-1">
                <input type="checkbox" id="deltid">
                <label class="pl-2 mb-1" for="deltid">Vue <span class="filterAntall">(102)</span></label>
              </li>
              <li class="list-group-item border-0 filter p-0 ml-1">
                <input type="checkbox" id="deltid">
                <label class="pl-2 mb-1" for="deltid">JavaScript <span class="filterAntall">(32)</span></label>
              </li>
              <li class="list-group-item border-0 filter p-0 ml-1">
                <input type="checkbox" id="deltid">
                <label class="pl-2 mb-1" for="deltid">Python <span class="filterAntall">(32)</span></label>
              </li>
              <li class="list-group-item border-0 filter p-0 ml-1">
                <input type="checkbox" id="deltid">
                <label class="pl-2 mb-1" for="deltid">Java <span class="filterAntall">(32)</span></label>
              </li>
            </ul>
          </div>
          <div class="søknadsfrist">
            <p class="card-title filtertypeTittel mb-2 mt-3">Søknadsfrist</p>
            <ul class="list-group list-group-flush">
              <li class="list-group-item border-0 filter p-0 ml-1">
                <input type="checkbox" id="deltid">
                <label class="pl-2 mb-1" for="deltid">Siste frist <span class="filterAntall">(18)</span></label>
              </li>
              <li class="list-group-item border-0 filter p-0 ml-1">
                <input type="checkbox" id="deltid">
                <label class="pl-2 mb-1" for="deltid">Under en uke <span class="filterAntall">(102)</span></label>
              </li>
              <li class="list-group-item border-0 filter p-0 ml-1">
                <input type="checkbox" id="deltid">
                <label class="pl-2 mb-1" for="deltid">Under tre døgn <span class="filterAntall">(32)</span></label>
              </li>
            </ul>
          </div>
          <div class="Fagområder">
            <p class="card-title filtertypeTittel mb-2 mt-3">Fagområder</p>
            <ul class="list-group list-group-flush">
              <li class="list-group-item border-0 filter p-0 ml-1">
                <input type="checkbox" id="deltid">
                <label class="pl-2 mb-1" for="deltid">Bygg, anlegg og eiendom <span
                    class="filterAntall">(18)</span></label>
              </li>
              <li class="list-group-item border-0 filter p-0 ml-1">
                <input type="checkbox" id="deltid">
                <label class="pl-2 mb-1" for="deltid">Forskning og innovasjon <span
                    class="filterAntall">(102)</span></label>
              </li>
              <li class="list-group-item border-0 filter p-0 ml-1">
                <input type="checkbox" id="deltid">
                <label class="pl-2 mb-1" for="deltid">IT-utvikling <span class="filterAntall">(32)</span></label>
              </li>
              <li class="list-group-item border-0 filter p-0 ml-1">
                <input type="checkbox" id="deltid">
                <label class="pl-2 mb-1" for="deltid">Energi og klima <span class="filterAntall">(32)</span></label>
              </li>
              <li class="list-group-item border-0 filter p-0 ml-1">
                <input type="checkbox" id="deltid">
                <label class="pl-2 mb-1" for="deltid">Maritimteknologi <span class="filterAntall">(32)</span></label>
              </li>
              <li class="list-group-item border-0 filter p-0 ml-1">
                <input type="checkbox" id="deltid">
                <label class="pl-2 mb-1" for="deltid">IT og tele <span class="filterAntall">(32)</span></label>
              </li>
              <li class="list-group-item border-0 filter p-0 ml-1">
                <input type="checkbox" id="deltid">
                <label class="pl-2 mb-1" for="deltid">IT-verktøy <span class="filterAntall">(32)</span></label>
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
                    <p class="font-weight-bold mb-0 mt-2">Fant 6 resultater for NRK</p>
                    <p class="mt-2 mb-2">Du søkte etter: NRK med filtrene: deltid</p>
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
                            <input @click="axiosMe('down')" class="form-check-input" type="radio"
                              name="sorteringAvStillinger" id="nyesteFørst" value="nyesteFørst" checked>
                            <label class="form-check-label sortering" for="nyesteFørst">
                              Nyeste først
                            </label>
                          </li>
                          <li>
                            <input @click="axiosMe('up')" class="form-check-input" type="radio"
                              name="sorteringAvStillinger" id="eldsteFørst" value="eldsteFørst">
                            <label class="form-check-label sortering" for="eldsteFørst">
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
          <div class="container my-0 p-2 d-flex justify-content-center">
            <div class="row">
              <div v-for="job in data.jobs" :key="job.id" class="col-sm-6 col-lg-4 p-2">
                <div style="min-height:480px;" class="boksen card">
                  <div style="width:100%; height:180px;" class="d-flex align-items-center card-img my-auto mx-auto">
                    <img style="width:60%; max-height:120px; " class="my-auto mx-auto card-img-top"
                      :src=job.companyImage alt="Card image cap">
                  </div>
                  <div style="min-height:360px; max-height:360px;" class="card-body">
                    <hr class="mt-0">
                    <h5 class="card-title font-weight-bold">{{ job.title }}</h5>
                    <div style="min-height: 170px; max-height:150px;" class="card-text">
                      {{ job.teaser.length > 0 ? job.teaser : job.about.slice(0, 170) + "..." }}</div>
                    <div style="position:absolute; bottom:60px;" class="ok d-flex align-items-center">
                      <a v-for="(key, val) in job.teknologier.reduce((a, c) => a + c, []).length < 32 ? job.teknologier : job.teknologier.slice(0, Math.floor(job.teknologier.length / 1.6))"
                        :key="val" class="link">{{ key }}</a>
                    </div>
                    <div style="position:absolute; bottom: 8px;"
                      class="px-2 d-flex justify-content-center align-items-center">
                      <span class="frist text-danger pr-2">Søkefrist: {{ job.date }}</span>
                      <div class="søkeButton card-1 d-flex justify-content-center align-items-center ml-2">
                        <p class="d-inline-block">SØK PÅ</p>
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
  import { ref } from "vue";
  var data = require("../../../api/data/data.json");
  data = ref(data);
  const axios = require("axios");

  export default {
    setup() {
      function axiosMe(message) {
        axios.get(`http://localhost:3000/api/jobs?sort=${message}`)
          .then(function (response) {
            data.value.jobs = response.data;
          })
          .catch(function (error) {
            return error;
          });
      }
      axiosMe("down");
      return {
        data,
        axiosMe,
      }
    }
  }
</script>