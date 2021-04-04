<template>
<br><br><br><br><br>
  <div class="homepage d-flex align-items-center justify-content-center">
    <div class="my-5 container mx-5">
      <div v-if="dbInfoRef" class="row d-flex justify-content-center">
        <div class="col-lg-4 col-xl-4">
          <div class="card-box text-center">
            <img :src="profilbilde" class="profile-image gjørTilClickable rounded-circle avatar-xl img-thumbnail mt-1" alt="profile-image">
            <h4 class="mb-0 mt-3 pt-1">{{ brukernavn }}</h4>
            <div class="text-left mt-3 text-center">
              <h4 class="h5 text-uppercase ommeg text-center mb-3">Om meg</h4>
              <p class="text-muted font-13 mb-3 text-center">{{ dbInfoRef.omMeg }}</p>
              <hr>

              <p class="text-muted mb-2 font-13"><strong>Fullt navn:<br> </strong> <span class="ml-0">{{ dbInfoRef.fornavn + " " + dbInfoRef.etternavn }}</span></p>
              <p class="text-muted mb-2 font-13"><strong>Epost: <br></strong> <span class="ml-0 ">{{ email }}</span></p>
            </div>
          </div>
          <!-- end card-box -->
        </div>
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
                      db.collection("users").doc(user.uid).set({
                        fornavn: fornavn.value,
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
                  etternavn: etternavn.value,
                  sosialt: "",
                  omMeg: omMeg.value, 
                }).then(function(){
                  location.reload();
                })
              }
          settings.value.loading = false;
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

      function omMegTeller(antall){
        console.log(antall.length - 250);
        antallOrdIgjen.value = 250 - antall.length;
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