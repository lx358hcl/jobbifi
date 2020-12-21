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
          <h4 class="card-title filterTittel pt-4 pb-2 mb-0">Filtrer resultatene:</h4>
          <div class="jobbtype">
            <p class="card-title filtertypeTittel mb-2 mt-3">Fulltid/deltid</p>
            <ul class="list-group list-group-flush">
              <li class="list-group-item border-0 filter p-0 ml-1">
                <input class="gjørTilClickable" type="checkbox" id="deltid">
                <label class="gjørTilClickable pl-2 mb-1" for="deltid">Deltid <span
                    class="filterAntall">({{  }})</span></label>
              </li>
              <li class="list-group-item border-0 filter p-0 ml-1">
                <input class="gjørTilClickable"
                  type="checkbox" id="internship">
                <label class="gjørTilClickable pl-2 mb-1" for="internship">Internship <span
                    class="filterAntall">({{  }})</span></label>
              </li>
              <li class="list-group-item border-0 filter p-0 ml-1">
                <input class="gjørTilClickable"
                  type="checkbox" id="fulltid">
                <label class="gjørTilClickable pl-2 mb-1" for="fulltid">Fulltid <span
                    class="filterAntall">({{  }})</span></label>
              </li>
            </ul>
          </div>
            <div class="søknadsfrist">
            <p class="card-title filtertypeTittel mb-2 mt-3">Søknadsfrist</p>
            <ul class="list-group list-group-flush">
              <li class="list-group-item border-0 filter p-0 ml-1">
                <input id="frist1" class="gjørTilClickable" type="radio" name="frist">
                <label for="frist1" class="pl-2 mb-1 gjørTilClickable">Under en uke <span class="filterAntall">({{ }})</span></label>
              </li>
              <li class="list-group-item border-0 filter p-0 ml-1">
                <input id="frist3" class="gjørTilClickable" type="radio" name="frist">
                <label for="frist3" class="pl-2 mb-1 gjørTilClickable">Under 1 måned <span class="filterAntall">({{  }})</span></label>
              </li>
              <li class="list-group-item border-0 filter p-0 ml-1">
                <input id="frist7" class="gjørTilClickable" type="radio" name="frist">
                <label for="frist7" class="pl-2 mb-1 gjørTilClickable">Under 3 måneder <span class="filterAntall">({{  }})</span></label>
              </li>
              <li class="list-group-item border-0 filter p-0 ml-1">
                <input id="fristIngen" class="gjørTilClickable" type="radio" name="frist" checked>
                <label for="fristIngen" class="pl-2 mb-1 gjørTilClickable">Under 12 måneder <span class="filterAntall">({{  }})</span></label>
              </li>
            </ul>
          </div>
          <!-- <div class="firma">
            <p class="card-title filtertypeTittel mb-2 mt-3">Firma</p>
            <ul class="list-group list-group-flush">
              <li v-for="job in data" :key="job.id" class="list-group-item border-0 filter p-0 ml-1">
                <input type="checkbox" id="deltid">
                <label class="pl-2 mb-1" for="deltid">{{ job.companyName }} <span class="filterAntall">(96)</span></label>
              </li>
            </ul>
          </div> -->
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
                            <input
                              class="form-check-input gjørTilClickable" type="radio" name="sorteringAvStillinger" id="nyesteFørst"
                              value="nyesteFørst" checked>
                            <label class="form-check-label gjørTilClickable" for="nyesteFørst">
                              Nyeste først
                            </label>
                          </li>
                          <li>
                            <input
                              class="form-check-input gjørTilClickable" type="radio" name="sorteringAvStillinger" id="eldsteFørst"
                              value="eldsteFørst">
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
              <div class="col-sm-6 col-lg-4 p-2">
                <div style="min-height:480px;" class="boksen card">
                  <div style="width:100%; height:180px;" class="d-flex align-items-center card-img my-auto mx-auto">
                    <img style="width:60%; max-height:120px;" class="my-auto mx-auto card-img-top pt-4"
                      alt="Card image cap">
                  </div>
                  <div style="min-height:360px; max-height:360px;" class="card-body">
                    <hr class="mt-0">
                    <div class = "stilling">
                      <h5 class="card-title font-weight-bold">{{  }}</h5>
                      <div style="min-height: 170px; max-height:150px;" class="card-text">
                        {{  }}</div>
                      <div class="ok d-flex align-items-center">
                        <a class="link">{{  }}</a>
                      </div>
                    </div>
                    <div style="position:absolute; bottom: 8px;"
                      class="px-2 d-flex justify-content-center align-items-center">
                      <span class="frist text-danger pr-2">Søkefrist: {{  }}</span>
                      <div class="søkeButton card-1 d-flex justify-content-center align-items-center ml-3">
                        <a style="height:35px; width:100px; line-height:21px;" class="btn btn-primary">SØK</a>
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
  
  export default {
  props: {
    "title": String,
  },
  setup(props) {
    console.log(props.title)
  }
}
</script>