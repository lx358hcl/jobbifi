<template>
<br><br><br><br><br>
  <div class="homepage d-flex align-items-center justify-content-center">
    <div class="my-5 container mx-5">
      <div v-if="dbInfoRef" class="row">
        <div class="col-lg-4 col-xl-4">
          <div class="card-box text-center">
            <img :src="profilbilde" class="profile-image gjørTilClickable rounded-circle avatar-xl img-thumbnail mt-1" alt="profile-image">
            <h4 class="mb-0 mt-3 pt-1">{{ brukernavn }}</h4>
            <div class="text-left mt-3">
              <h4 class="font-13 text-uppercase ommeg text-center mb-3">Om meg</h4>
              <p class="text-muted font-13 mb-3 text-center">{{ dbInfoRef.omMeg }}</p>
              <p class="text-muted mb-2 font-13"><strong>Fullt navn: </strong> <span class="ml-0">{{ dbInfoRef.fornavn + " " + dbInfoRef.etternavn }}</span></p>
              <p class="text-muted mb-2 font-13"><strong>Epost: </strong> <span class="ml-0 ">{{ email }}</span></p>
            </div>
          </div>
          <!-- end card-box -->
        </div>
        <!-- end col-->
        <div class="col-lg-8 col-xl-8">
          <div class="card-box">
            <ul class="nav nav-pills navtab-bg mt-1 mb-3">
              <li class="nav-item mx-auto pt-2">
                <b><h4 class="font-13 text-uppercase ommeg">~ Innstillinger ~</h4></b>
              </li>
            </ul>
          <hr>
            <div class="tab-content mt-0 pt-0">
              <!-- end timeline content-->
              <div class="tab-pane active" id="settings">
              <!--Velg profilbilde -->
                <form method="post" v-on:submit.prevent="lagre();">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class = "mb-2" for="firstname">Fornavn</label>
                        <input type="text" class="form-control" id="firstname" v-model="fornavn" placeholder="Fornavn">
                      </div>
                      <div class="form-group">
                        <label class = "mb-2" for="lastname">Etternavn</label>
                        <input type="text" class="form-control" id="lastname" placeholder="Etternavn" v-model="etternavn">
                      </div>
                    </div>
                    <div class="col-md-6">
                       <div class="avatar-upload gjørTilClickable">
                        <div class="avatar-edit">
                            <input v-on:change="readURL($event.target)" type='file' id="imageUpload" accept=".png, .jpg, .jpeg" />
                            <label class = "d-flex align-items-center justify-content-center" for="imageUpload"></label>
                        </div>
                        <label for="imageUpload" class = "gjørTilClickable">
                          <div class="avatar-preview">
                              <img id="imagePreview" :src="profilbilde">
                          </div>
                        </label>
                    </div>
                    </div>
                    <!-- end col -->
                   
                  </div>
                  <!-- end row -->
                  <div class="row">
                    <div class="col-12">
                      <div class="form-group">
                        <label class = "mb-2" for="userbio">Om Meg</label>
                        <textarea placeholder="Om deg" v-model="omMeg" @input="omMegTeller($event.target.value)" maxlength = "250" class="form-control" id="userbio" rows="4">{{ dbInfoRef.omMeg }}</textarea>
                        <span class = "float-right">Antall ord igjen: {{ antallOrdIgjen }}</span>
                      </div>
                    </div>
                    
                    <!-- end col -->
                  </div>
                  <div class="row">
                    <!-- end col -->
                  </div>
                  <!-- end row -->
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class = "mb-2" for="useremail">E-postadresse</label>
                        <input type="email" class="form-control" id="useremail" placeholder="Enter email" :value="email">
                      </div>
                      <div class="form-group">
                        <label class = "mb-2" for="useremail">Bekreft e-postadresse</label>
                        <input type="email" class="form-control" id="useremail" placeholder="Enter email">
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class = "mb-2" for="userpassword">Passord</label>
                        <input type="password" class="form-control" id="userpassword" placeholder="Enter password">
                      </div>
                      <div class="form-group">
                        <label class = "mb-2" for="userpassword">Bekreft passord</label>
                        <input type="password" class="form-control" id="userpassword" placeholder="Enter password">
                      </div>
                    </div>
                    <!-- end col -->
                  </div>
                  <!-- end row -->
                  <h5 class="mb-2 text-uppercase bg-light py-3">Sosialt</h5>
                  <!-- end row -->
                  <div class="row">
                    <div class="col-md-4">
                      <div class="form-group">
                        <label for="social-lin mb-2">LinkedIn</label>
                        <div class="input-group mt-2">
                          <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fab fa-linkedin"></i></span>
                          </div>
                          <input type="text" class="form-control" id="social-lin" placeholder="Url">
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label for="social-lin">Nettside</label>
                        <div class="input-group mt-2">
                          <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fab fa-linkedin"></i></span>
                          </div>
                          <input type="text" class="form-control" id="social-lin" placeholder="Url">
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <label for="social-gh">Github</label>
                        <div class="input-group mt-2">
                          <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fab fa-github"></i></span>
                          </div>
                          <input type="text" class="form-control" id="social-gh" placeholder="Username">
                        </div>
                      </div>
                    </div>
                    <!-- end col -->
                  </div>
                  <!-- end row -->
                  <div class="text-right">
                    <button class="btn btn-success waves-effect waves-light mt-2">
                      <div v-if="settings.loading == false">
                        <i class="mdi mdi-content-save"></i> Lagre
                      </div>
                      <spinner v-else style = "width:20px; height:20px; border-width:2px;"></spinner>
                    </button>
                  </div>
                </form>
              </div>
              <!-- end settings content-->
            </div>
            <!-- end tab-content -->
          </div>
          <!-- end card-box-->
        </div>
        <!-- end col -->
      </div>
      <div v-else class = "d-flex justify-content-center w-100 h-100">
      
      <spinner></spinner>
      
      </div>
    </div>
  </div>
</template>

<script>
  import { ref } from "vue";
  import firebase from "../main.js";
  import firestore from 'firebase/firestore';
  import spinner from "../components/spinner.vue";
  import { settings } from "../settings.js";
  
  var toast = require('vue-izitoast');
  var $ = require('jquery');
  var email = ref("");
  var brukernavn = ref("");
  var fornavn = ref("");
  var etternavn = ref("");
  var profilbilde = ref("");
  var sosialt = ref("");
  var omMeg = ref("");
  var linkedIn = ref("");
  var gitHub = ref("");
  var nettside = ref("");
  var dbInfoRef = ref("");
  var antallOrdIgjen = ref("250");
  var reader = new FileReader();
  var fil = null;

  function omMegTeller(antall){
    console.log(antall.length - 250);
    antallOrdIgjen.value = 250 - antall.length;
  }

  async function getInfo() {
    var user = await firebase.default.auth().currentUser;
    var db = await firebase.firestore();
    var dbInfo = await db.collection("users").doc(user.uid).get();
    dbInfo = await dbInfo.data();
    console.log(dbInfo);
    dbInfoRef.value = dbInfo;
    email.value = user.email;
    brukernavn.value = dbInfo.username;
    fornavn.value = dbInfo.fornavn;
    etternavn.value = dbInfo.etternavn;
    profilbilde.value = dbInfo.profilbilde;
    sosialt.value = dbInfo.sosialt;
    omMeg.value = dbInfo.omMeg;
    linkedIn.value = dbInfo.linkedIn;
    gitHub.value = dbInfo.gitHub;
    nettside.value = dbInfo.nettside;
    omMegTeller(dbInfo.omMeg);
  }

  export default {
    setup() { 
      async function lagre(){
          settings.value.loading = true;
          var user = await firebase.default.auth().currentUser;
          var db = await firebase.firestore();
          // Create a storage reference from our storage service
              var storageRef;
              var upload;
              var profilePicURL;
              
              if(fil != null){
                storageRef = await firebase.storage().ref("/profilBilder/" + fil.name);

                await storageRef.put(fil).then((snapshot) => {
                  snapshot.ref.getDownloadURL().then((downloadURL) => {
                    profilePicURL = downloadURL;
                      console.log('File available at', downloadURL);
                      db.collection("users").doc(user.uid).update({
                        fornavn: fornavn.value,
                        brukernavn: brukernavn.value,
                        etternavn: etternavn.value,
                        profilbilde: profilePicURL,
                        sosialt: "",
                        omMeg: omMeg.value, 
                      }).then(function(){
                        location.reload();
                      })
                  });
                })
              }
              else{
                await db.collection("users").doc(user.uid).update({
                  fornavn: fornavn.value,
                  brukernavn: brukernavn.value,
                  etternavn: etternavn.value,
                  sosialt: "",
                  omMeg: omMeg.value,
                }).then(function(){
                  location.reload();
                })
              }
          settings.value.loading = false;
          // iziToast.success({
          //   title: 'Lagret',
          //   message: 'Kontoinformasjon oppdatert',
          // });
          // getInfo();
      }
      function readURL(input) {
        fil = input;
        console.log(input.files);
          if (input.files && input.files[0]) {
            reader.onload = function(e) {
              console.log("OK");
              $('#imagePreview').attr("src",e.target.result);
              $('#imagePreview').hide();
              $('#imagePreview').fadeIn(650);
            }
            console.log(reader);
            fil = input.files[0];
            reader.readAsDataURL(input.files[0]);
        }
      }
      
      getInfo();

      return {
        email,
        brukernavn,
        readURL,
        dbInfoRef,
        spinner,
        lagre,
        omMegTeller,
        antallOrdIgjen,
        fornavn,
        etternavn,
        omMeg,
        settings,
        profilbilde,
      }
    },
  }

  export {
    getInfo
  }
</script>