<template>
<main class="page contact-us-page center">
  <section class="clean-block clean-form dark w-100" style="padding-bottom: 0px;min-height: calc(100vh - 200px);background: rgb(255,255,255);">
      <div class="container">
        <div v-if="brukernavn" class="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-1 row-cols-xl-1 justify-content-center" style="margin-top: 50px;margin-bottom: 50px;">
            <div class="mt-5 col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5 d-flex justify-content-center" id="profilSideBilde" style="padding-right: 20px;padding-left: 20px;border-radius: 5px;height: 100%;">
                <div class="card mb-0 pb-0" style="border-style: none;">
                    <div class="card-body d-flex flex-column justify-content-center">
                        <div class="d-flex justify-content-center imagePreview">
                          <div class="img-fluid" data-bss-hover-animate="pulse" v-bind:style="{ backgroundImage: 'url(' + profilbilde + ')' }" style="background-repeat: no-repeat; background-size: cover; width:220px; height:220px; border-radius: 156px;box-shadow: 0px 0px 4px 1px rgba(82,82,82,0.87);border: 1px none rgb(79,79,79);">
                          </div>
                        </div>
                        <h4 class="text-center card-title" style="margin-top: 20px;font-weight: 900;margin-bottom: 20px;font-family: lato;">{{ brukernavn }}</h4>
                        <h6 class="text-muted card-subtitle mb-2" style="color: rgb(37,37,37) !important;font-weight: 600;text-align: center;font-family: Lato;">OM MEG</h6>
                        <hr >
                        <p class="card-text" style="text-align: left;" v-html="omMeg"></p>
                        <div>
                          <p v-if="linkedIn || gitHub" class = "text-center mb-4" style="margin: 12px 0px 16px;margin-top: 12px;font-size: 20px;font-family: Lato;font-weight: 900;margin-bottom: 12px;">Lenker og sånt</p>
                          <div class="social-icons d-flex justify-content-center align-center">
                            <a v-if="linkedIn" :href="linkedIn">
                              <i style = "color: #0a66c2;" class="icon ion-social-linkedin sosialKnapp d-flex align-items-center justify-content-center"></i>
                            </a>
                            <a v-if="gitHub" :href="gitHub">
                              <i style = "color: #2f2f2f;" class="icon ion-social-github sosialKnapp d-flex align-items-center justify-content-center"></i>
                            </a>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-0 p-0 col-12 col-sm-12 col-md-6 col-lg-7 col-xl-7">
                <div class="p-0">
                    <div class="card-body pr-0 pl-0" style="font-family: Lato;">
                    <form class="dashboard" v-on:submit.prevent="lagre()">
                        <h4 class="card-title" style="text-align: center;font-family: Lato;font-weight: 900;">INNSTILLINGER</h4>
                        <hr>
                        <div class="row row-cols-1 row-cols-sm-1 row-cols-md-1 d-flex flex-row-reverse justify-content-center justify-content-sm-center">
                          <div class="col-6 col-sm-5 col-md-5 col-lg-5 col-xl-5 d-flex justify-content-center align-items-center align-content-center" style="padding-bottom: 15px;padding-top: 15px;">
                                <div class="d-flex justify-content-center align-items-center align-content-center" style="margin-top: 0px;margin-right: 0px;height: 100%;width: 100%;">
                                    <div v-on:change="readURL($event.target)" type='file' id="imageUpload" accept=".png, .jpg, .jpeg" v-bind:style="{ backgroundImage: 'url(' + profilbilde + ')' }" style="background-repeat: no-repeat; background-size: cover; background-position: center; border-radius: 160px;border-width: 0px;border-style: solid;box-shadow: 0px 0px 2px 2px rgba(47,47,47,0.45);height: 150px;">
                                      <label for = "filOpplastning">
                                        <i class="fas fa-camera lastOppBildeKnapp" style="text-align: right;margin-left: 112px;font-size: 16px;background: #f5f5f5;padding: 10px;border-radius: 51px;color: rgb(35,39,42);margin-top: 6px;border-width: 1px;border-color: rgb(103,103,103);box-shadow: 0px 0px 3px 1px rgb(84,84,84);">
                                        </i>
                                      </label>
                                      <input id = "filOpplastning" type = "file">
                                    </div>
                                </div>
                            </div>
                            
                            <div class="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-7 d-flex flex-row justify-content-start align-items-center" style="max-width: 100%;width: 100%;">
                                <div style="width: 100%;">
                                    <p style="margin: 0px;margin-top: 0px;margin-bottom: 9px;font-family: Lato;font-size: 20px;font-weight: 900;">Fornavn</p><input v-model="fornavn" type="text" style="margin: -2px;width: 100%;padding-top: 5px;padding-bottom: 5px;border-radius: 3px;border: 1px solid rgb(200,200,200);padding-left: 10px;height: 40px;" :placeholder="fornavn">
                                    <p style="margin: 0px;margin-top: 6px;margin-bottom: 9px;font-family: Lato;font-size: 20px;font-weight: 900;">Etternavn</p><input v-model="etternavn" type="text" style="width: 100%;border-radius: 3px;border: 1px solid rgb(200,200,200);height: 40px;padding-left: 10px;margin: -2px;" :placeholder="etternavn">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12" style="max-width: 100%;">
                                <p style="margin: 12px 0px 16px;margin-top: 12px;font-size: 20px;font-family: Lato;font-weight: 900;margin-bottom: 12px;">Om meg</p>
                                <textarea class v-model.lazy="omMeg" @input="omMegTeller($event.target.value)" maxlength = "500" style="width: 100%;height: 95px;border-style: solid;border-color: rgb(207,207,207);border-radius: 5px; padding-left:11px; padding-top:8px;">{{ dbInfoRef.omMeg }}</textarea>
                                <span class = "float-right mt-2">Antall ord igjen: {{ antallOrdIgjen }}</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-11 d-sm-flex flex-column" style="min-width: 100%;">
                                <p style="margin: 0px;margin-top: 10px;margin-bottom: 10px;font-family: Lato;font-size: 20px;font-weight: 900;">E-post</p><input v-model="email" type="text" style="width: 100%;padding-top: 5px;padding-bottom: 5px;border-radius: 3px;border: 1px solid rgb(200,200,200);height: 40px;padding-left: 10px;margin-left: 0px;">
                            </div>
                            <div class="col d-flex d-sm-flex flex-column justify-content-center justify-content-sm-center">
                                <p style="margin: 0px;margin-top: 10px;margin-bottom: 10px;font-family: Lato;font-size: 20px;font-weight: 900;">Passord</p><input v-model="password" type="text" style="width: 100%;padding-top: 5px;padding-bottom: 5px;border-radius: 3px;border: 1px solid rgb(200,200,200);padding-left: 10px;height: 40px;" placeholder="Skriv inn nytt password her og trykk Lagre">
                            </div>
                        </div>
                        <p style="margin: 0px;margin-top: 10px;margin-bottom: 10px;font-family: Lato;font-size: 20px;font-weight: 900;">Lenker</p>
                        <div class="row" style="margin-top: 15px;padding-top: 0px;padding-bottom: 9px;">
                            
                            <div class="col">
                                <div class="input-group">
                                    <div class="input-group-prepend"><span class="input-group-text" style="font-size: 24px;">
                                    <i class="fa fa-linkedin"></i>
                                    </span></div><input class="form-control" type="text" v-model = "linkedIn" :placeholder="linkedIn ? linkedIn : 'Din LinkedIn'" style="border-bottom-right-radius: 4px;border-top-right-radius: 4px;">
                                </div>
                            </div>
                            <div class="col">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                      <span class="input-group-text" style="font-size: 24px;">
                                        <i class="fa fa-github"></i>
                                      </span>
                                    </div>
                                    <input class="form-control" type="text" v-model = "gitHub" :placeholder="gitHub ? gitHub : 'Din GitHub'" style="border-bottom-right-radius: 4px;border-top-right-radius: 4px;">
                                </div>
                            </div>
                        </div>
                        <div class="row" style="margin-top: 15px;padding-top: 9px;padding-bottom: 9px;">
                            <div class="col">
                                <div class="input-group">
                                    <div class="input-group-prepend"><span class="input-group-text" style="font-size: 24px;">
                                    <i v-if="!userInfo.emailVerified" class="fa fa-check-circle"></i>
                                    <i v-else style = "color:green;" class="fa fa-check-circle"></i>
                                    </span></div><input disabled class="form-control" type="text" :placeholder="placeHolder" style="border-bottom-right-radius: 4px;border-top-right-radius: 4px;">
                                </div>
                                  <a v-if="!userInfo.emailVerified" @click="sendVerifiseringsEpost()" class = "verifiseringsEpost mt-2 d-block clickable">Trykk her for å motta verifiseringsepost på nytt</a>
                            </div>
                        </div>
                        <hr>
                        <p class="text-muted card-subtitle mt-1" style="color: rgb(37,37,37) !important; text-align: left;font-family: Lato;"><b>Din UID:</b> {{ user.uid }} </p>
                        <hr>
                        <slettKonto></slettKonto>
                        <div class="row">
                            <div class="col d-flex justify-content-end" style="margin-top: 15px;margin-bottom: 5px;">
                              <button type="submit" class="p-3 d-flex align-items-center btn btn-primary" style="background: rgb(40,167,69);border-style: none;padding-top: 7px;padding-bottom: 7px;padding-right: 14px;padding-left: 14px;font-size: 18px;">
                                <i v-if="!settings.loading" class="fa fa-save"> Lagre</i>
                                <spinner v-else></spinner>
                              </button>
                            </div>
                        </div>
                      </form>
                    </div>
                </div>
            </div>
        </div>
      </div>            
  </section>
</main>

</template>
<script>
  import { ref } from "vue";
  import firebaseApp from "../../../firebase/firebaseconfig.js";
  import firestore from 'firebase/firestore';
  import spinner from "../components/spinner.vue";
  import slettKonto from "../components/slettKonto.vue";
  import { settings } from "../settings.js";
  
  var toast = require('vue-izitoast');
  var email = ref("");
  var brukernavn = ref("");
  var fornavn = ref("");
  var etternavn = ref("");
  var profilbilde = ref("");
  var omMeg = ref("");
  var linkedIn = ref("");
  var gitHub = ref("");
  var nettside = ref("");
  var dbInfoRef = ref("");
  var antallOrdIgjen = ref("250");
  var reader = new FileReader();
  var fil = null;
  var placeHolder = ref("");
  var userInfo = ref(""); 
  var password = ref("");
  var user = ref("");

  function omMegTeller(omMegTekst){
    console.log(omMegTekst.length - 500);
    antallOrdIgjen.value = 500 - omMegTekst.length;
    omMeg.value = omMegTekst;
  }

  async function getInfo() {
    user = await firebaseApp.auth().currentUser;
    var db = await firebaseApp.firestore();
    if(user){
      var dbInfo = await db.collection("users").doc(user.uid).get();
      dbInfo = await dbInfo.data();
      console.log(dbInfo);
      dbInfoRef.value = dbInfo;
      email.value = user.email;
      brukernavn.value = dbInfo.brukernavn;
      fornavn.value = dbInfo.fornavn;
      etternavn.value = dbInfo.etternavn;
      profilbilde.value = dbInfo.profilbilde;
      omMeg.value = dbInfo.omMeg;
      linkedIn.value = dbInfo.linkedIn;
      gitHub.value = dbInfo.gitHub;
      nettside.value = dbInfo.nettside;
      omMegTeller(dbInfo.omMeg);
      return dbInfo;
    }
  }

  //Send verifiseringsepost
  async function sendVerifiseringsEpost(){
    var user = await firebaseApp.auth().currentUser;
    user.sendEmailVerification().then(function(){
      console.log("done");
      document.querySelector(".verifiseringsEpost").outerHTML = "<p class = 'text-success mt-2'>Vi har sendt deg en ny verifiseringsepost :) Sjekk søppelposten din, mulig den blir plassert der</p>";
    })
    .catch(function(error){
      if(error.code == "auth/too-many-requests"){
        document.querySelector(".verifiseringsEpost").outerHTML = "<p class = 'text-danger mt-2'>Du kan ikke be om ny verifiseringsepost så mange ganger på rad, vent et øyeblikk.</p>";
        console.log(error);
      }
    })
  }

  export default {
    setup() { 
      userInfo = firebaseApp.auth().currentUser;
      placeHolder.value = userInfo.emailVerified ? "Du er verifisert :)" : "Du er ikke verifisert enda";
      console.log(userInfo.emailVerified);
      settings.value.loading = false;
      
      async function lagre(){
          settings.value.loading = true;
          var user = await firebaseApp.auth().currentUser;
          var db = await firebaseApp.firestore();
          // Create a storage reference from our storage service
              var storageRef;
              var upload;
              var profilePicURL;

              if(password.value){
                console.log(password.value);
                try{
                  await user.updatePassword(password.value);
                  console.log("Passord oppdatert");
                }
                catch(error) {
                  console.log(error);
                }
              }
              
              if(fil != null){
                storageRef = await firebaseApp.storage().ref("/profilBilder/" + fil.name);

                await storageRef.put(fil).then((snapshot) => {
                  snapshot.ref.getDownloadURL().then((downloadURL) => {
                    profilePicURL = downloadURL;
                      console.log('File available at', downloadURL);
                      db.collection("users").doc(user.uid).update({
                        fornavn: fornavn.value,
                        brukernavn: brukernavn.value,
                        etternavn: etternavn.value,
                        profilbilde: profilePicURL,
                        omMeg: omMeg.value,
                        linkedIn: linkedIn.value,
                        gitHub: gitHub.value,
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
                  omMeg: omMeg.value,
                  linkedIn: linkedIn.value,
                  gitHub: gitHub.value,
                }).then(function(){
                  location.reload();
                })
              }
      }
      function readURL(input) {
        fil = input;
        console.log(input.files);
          if (input.files && input.files[0]) {
            reader.onload = function(e) {
              profilbilde.value = e.target.result;
              $('#imageUpload').hide();
              $('#imageUpload').fadeIn(650);
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
        userInfo,
        placeHolder,
        sendVerifiseringsEpost,
        linkedIn,
        gitHub,
        password,
        user,
        slettKonto,
      }
    },
  }

  export {
    getInfo
  }
</script>