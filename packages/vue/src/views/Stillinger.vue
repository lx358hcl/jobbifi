<template>
  <main class="container-fluid m-0 p-0 pt-2">
    <div style="max-width:1400px; margin-bottom:100px;" class="container">
      <div class="row">
        <div class="col-3 pr-0">
          <h4 class="card-title filterTittel pt-4 pb-2 mb-0">Filtrer resultatene:</h4>
          <div class="jobbtype">
            <p class="card-title filtertypeTittel mb-2 mt-3">Fulltid/deltid</p>
            <ul class="list-group list-group-flush">
              <li class="list-group-item border-0 filter p-0 ml-1">
                <input class="gjørTilClickable" v-bind:checked="settings.type.includes('deltid')"
                  @click="changeType(['type', 'deltid', $event.target.checked])" type="checkbox" id="deltid">
                <label class="gjørTilClickable pl-2 mb-1" for="deltid">Deltid <span
                    class="filterAntall">({{ antall["deltid"] }})</span></label>
              </li>
              <li class="list-group-item border-0 filter p-0 ml-1">
                <input class="gjørTilClickable" v-bind:checked="settings.type.includes('internship')"
                  @click="changeType(['type', 'internship', $event.target.checked])" type="checkbox" id="internship">
                <label class="gjørTilClickable pl-2 mb-1" for="internship">Internship <span
                    class="filterAntall">({{ antall["internship"]}})</span></label>
              </li>
              <li class="list-group-item border-0 filter p-0 ml-1">
                <input class="gjørTilClickable" v-bind:checked="settings.type.includes('fulltid')"
                  @click="changeType(['type', 'fulltid', $event.target.checked])" type="checkbox" id="fulltid">
                <label class="gjørTilClickable pl-2 mb-1" for="fulltid">Fulltid <span
                    class="filterAntall">({{ antall["fulltid"]}})</span></label>
              </li>
            </ul>
          </div>
          <div class="søknadsfrist">
            <p class="card-title filtertypeTittel mb-2 mt-3">Søknadsfrist</p>
            <ul class="list-group list-group-flush">
              <li class="list-group-item border-0 filter p-0 ml-1">
                <input id="frist1" class="gjørTilClickable"
                  v-on:click="changeFrist(['frist', '7', $event.currentTarget.checked])" type="radio" name="frist">
                <label for="frist1" class="pl-2 mb-1 gjørTilClickable">Under en uke <span
                    class="filterAntall">({{ alleTeknologierInfo.antallStillingerPerFrist["7"] }})</span></label>
              </li>
              <li class="list-group-item border-0 filter p-0 ml-1">
                <input id="frist3" class="gjørTilClickable"
                  v-on:click="changeFrist(['frist', '30', $event.currentTarget.checked])" type="radio" name="frist">
                <label for="frist3" class="pl-2 mb-1 gjørTilClickable">Under 1 måned <span
                    class="filterAntall">({{ alleTeknologierInfo.antallStillingerPerFrist["30"] }})</span></label>
              </li>
              <li class="list-group-item border-0 filter p-0 ml-1">
                <input id="frist7" class="gjørTilClickable"
                  v-on:click="changeFrist(['frist', '90', $event.currentTarget.checked])" type="radio" name="frist">
                <label for="frist7" class="pl-2 mb-1 gjørTilClickable">Under 3 måneder <span
                    class="filterAntall">({{ alleTeknologierInfo.antallStillingerPerFrist["90"] }})</span></label>
              </li>
              <li class="list-group-item border-0 filter p-0 ml-1">
                <input id="fristIngen" class="gjørTilClickable"
                  v-on:click="changeFrist(['frist', '9000', $event.currentTarget.checked])" type="radio" name="frist"
                  checked>
                <label for="fristIngen" class="pl-2 mb-1 gjørTilClickable">Under 12 måneder <span
                    class="filterAntall">({{ alleTeknologierInfo.antallStillingerPerFrist["9000"] }})</span></label>
              </li>
            </ul>
          </div>
          <div class="ferdigheter">
            <p class="card-title filtertypeTittel mb-2 mt-3">Ferdigheter</p>
            <ul class="list-group list-group-flush">
              <li v-for="teknologi in alleTeknologierInfo.unikeTeknologier" v-bind:key="teknologi"
                class="list-group-item border-0 filter p-0 ml-1">
                <input @click="changeTekno(['skill', teknologi, $event.target.checked])" v-bind:name="teknologi"
                  type="checkbox" v-bind:id="teknologi">
                <label class="pl-2 mb-1 gjørTilClickable"
                  v-bind:for="teknologi">{{ teknologi[0].toUpperCase() + teknologi.slice(1) }}<span
                    class="filterAntall gjørTilClickable">
                    ({{ alleTeknologierInfo.antallStillingerPerTeknologi[teknologi] }})</span></label>
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
                    <p class="font-weight-bold mb-0 mt-2">Fant {{ data.length }} resultater </p>
                    <p class="mt-2 mb-2">Du søkte etter: <span
                        class="font-italic font-weight-bold">{{ settings.search.length > 0 ? settings.search : "" }}</span>
                    </p>
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
                            <input @click="sorter(['sort', 'down', $event.currentTarget.checked])"
                              class="form-check-input gjørTilClickable" type="radio" name="sorteringAvStillinger"
                              id="nyesteFørst" value="nyesteFørst" checked>
                            <label class="form-check-label gjørTilClickable" for="nyesteFørst">
                              Nyeste først
                            </label>
                          </li>
                          <li>
                            <input @click="sorter(['sort', 'up', $event.currentTarget.checked])"
                              class="form-check-input gjørTilClickable" type="radio" name="sorteringAvStillinger"
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
              <div v-for="job in data" :key="job.id" class="col-sm-6 col-lg-4 p-2">
                <div style="min-height:480px;" class="boksen card">
                  <div style="width:100%; height:180px;" class="d-flex align-items-center card-img my-auto mx-auto">
                    <img style="width:60%; max-height:120px;" class="my-auto mx-auto card-img-top pt-4"
                      :src=job.companyImage alt="Card image cap">
                  </div>
                  <div style="min-height:360px; max-height:360px;" class="card-body">
                    <hr class="mt-0">
                    <div class="stilling">
                      <a v-bind:href="`http://localhost:8080/stilling/${job.id}`"><h5 class="card-title font-weight-bold">{{ job.title }}</h5></a>
                      <div style="min-height: 170px; max-height:150px;" class="card-text">
                        {{ job.teaser.length > 0 ? job.teaser : job.about.slice(0, 170) + "..." }}</div>
                      <div class="ok d-flex align-items-center">
                        <a v-for="(key, val) in job.teknologier" :key="val" class="link">{{ key }}</a>
                      </div>
                    </div>
                    <div style="position:absolute; bottom: 8px;"
                      class="px-2 d-flex justify-content-center align-items-center">
                      <span class="frist text-danger pr-2">Søkefrist: {{ job.date }}</span>
                      <div class="søkeButton card-1 d-flex justify-content-center align-items-center ml-3">
                        <a style="height:35px; width:100px; line-height:21px; color: #333; margin-top:12px; "
                          v-bind:href="job.url" class="text-center">SØK</a>
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
      //Noen variabler og innholdstrackere
      var antall = ref({});
      var hovedData = require("../../../api/data/data.json");
      var alleTeknologierInfo = {
        "unikeTeknologier": [...new Set(hovedData.jobs.reduce((a, c) => a.concat(c.teknologier), []))],
        "antallStillingerPerTeknologi": {},
        "alleTeknologier": hovedData.jobs.reduce((a, c) => a.concat(c.teknologier), []),
        "antallStillingerPerFrist": {
          "7": 0,
          "30": 0,
          "90": 0,
          "9000": 0,
        },
      }

      //Sortering
      function sorter(message) {
        var [type, query, state] = message;
        settings.value.sort = query;
        data.value = axiosMe();
      }

      //Stilling
      function changeType(message) {
        var [type, query, state] = message;
        if (state) settings.value.type.push(query);
        else settings.value.type.splice(settings.value.type.indexOf(query), 1);
        data.value = axiosMe();
      }

      //Frist
      function changeFrist(message) {
        var [type, query, state] = message;
        settings.value.frist = query;
        data.value = axiosMe();
      }

      //Tekno
      function changeTekno(message) {
        var [type, query, state] = message;
        if (state) settings.value.tekno.push(query);
        else settings.value.tekno.splice(settings.value.tekno.indexOf(query), 1);
        data.value = axiosMe();
      }

      //Finn antall
      function finnAntall() {
        antall.value["fulltid"] = hovedData.jobs.reduce((a, c) => c.position == "fulltid" ? 1 + a : 0 + a, 0);
        antall.value["deltid"] = hovedData.jobs.reduce((a, c) => c.position == "deltid" ? 1 + a : 0 + a, 0);
        antall.value["internship"] = hovedData.jobs.reduce((a, c) => c.position == "internship" ? 1 + a : 0 + a, 0);
        for (let el of alleTeknologierInfo.alleTeknologier) {
          alleTeknologierInfo.antallStillingerPerTeknologi[el] = alleTeknologierInfo.antallStillingerPerTeknologi[el] ?
            alleTeknologierInfo.antallStillingerPerTeknologi[el] + 1 : 1;
        }
        var temp = [];
        var dagensDato = new Date();
        hovedData.jobs.forEach(e => {
          var frist = new Date(e.americanDate);
          var differanse = (frist - dagensDato) / 86400000;
          if (differanse < 7) alleTeknologierInfo.antallStillingerPerFrist["7"] = alleTeknologierInfo
            .antallStillingerPerFrist["7"] + 1;
          if (differanse < 30) alleTeknologierInfo.antallStillingerPerFrist["30"] = alleTeknologierInfo
            .antallStillingerPerFrist["30"] + 1;
          if (differanse < 90) alleTeknologierInfo.antallStillingerPerFrist["90"] = alleTeknologierInfo
            .antallStillingerPerFrist["90"] + 1;
          if (differanse < 9000) alleTeknologierInfo.antallStillingerPerFrist["9000"] = alleTeknologierInfo
            .antallStillingerPerFrist["9000"] + 1;
        });
        return temp;
      }

      //Ved component-loading, call API-en og finnantall stillinger etc.
      //API-call basert på settings
      function axiosMe() {
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
      axiosMe();
      finnAntall();

      return {
        data,
        axiosMe,
        settings,
        changeType,
        antall,
        sorter,
        alleTeknologierInfo,
        changeTekno,
        changeFrist,
      }
    }
  }
  export { settings, data };
</script>