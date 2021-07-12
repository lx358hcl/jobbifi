<template>
  <main>
    <section class="login-clean loginRegister fyllSkjermen d-flex align-items-center">
      <div class="container">
        <div class="row no-gutters row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 justify-content-center" style="padding-right: 40px;padding-left: 40px;">
          <div class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" style="border-bottom-left-radius: 30px; border-top-left-radius: 30px; padding-right: 0px;padding-left: 0px; background: url(assets/img/rom.jpg) no-repeat center center; 
          -webkit-background-size: cover;
          -moz-background-size: cover;
          -o-background-size: cover;
          background-size: cover;"></div>
          <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="padding-right: 0px;padding-left: 0px;">
            <form v-on:submit.prevent="opprettBruker();" class="d-flex flex-column justify-content-center align-content-center loginRegisterFormene" id="loginBoks" method="post">
              <h2 class="sr-only">Login Form</h2>
              <div class="illustration">
                <p class="animate__animated animate__slower animate__swing" style="font-family: 'Goudy Bookletter 1911', serif;color: rgb(45,45,45);font-weight: 900;margin-bottom: 0px;">&amp;</p>
                <hr>
                <p style="color: rgb(20,20,20);font-family: Spectral, serif;font-size: 20px;font-style: italic;text-align: center;"><strong>Opprett en konto</strong></p>
                <hr>
              </div>
              <div class="form-group"><input required type="email" v-model="email" class="form-control" name="email" placeholder="E-post" style="font-family: Lato, sans-serif;font-weight: normal;"></div>
              <div class="form-group"><input required type="text" v-model="brukernavn" class="form-control" name="brukernavn" placeholder="Brukernavn" style="font-family: Lato, sans-serif;font-weight: normal;"></div>
              <div class="form-group d-flex flex-row">
                <input id="passord" required type="password" class="form-control" v-model="password" name="password" placeholder="Passord" style="font-family: Lato, sans-serif;font-weight: normal;" />
                <div @click="visPassord" id="visPassord" class="d-flex justify-content-center align-items-center" tabindex="0" style="cursor:pointer; background: rgb(247,249,252); border-bottom: 1px solid rgb(223,231,241);width: 50px;">
                  <i id = "showPasswordEye" class="fas fa-eye-slash"></i>
                </div>
              </div>
              <p class="error mb-0 mt-2 py-0 text-center text-danger" v-if="true">{{ error }}</p>
              <div class="form-group">
                <button class="btn btn-primary btn-block" type="submit" style="color: rgb(255, 255, 255);background: #212529;font-family: Lato, sans-serif;font-weight: bold;">
                  <spinner v-if="loading" class="loadingSpinner"></spinner>
                  <span v-else>Opprett konto</span>
                </button>
                <p style="color:red;" class="text-center error mb-1 mt-4 py-0">{{ errorTekst }}</p>
              </div>
              <router-link class="forgot hitLinks" to="/retningslinjer">Ved å registrere deg så godtar du <b><br>Retningslinjer og personvern</b></router-link>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
  import firebaseApp from "../../../firebase/firebaseconfig.js";
  import firestore from 'firebase/firestore';
  import { ref } from "vue";
  import spinner from "../components/spinner.vue";
  import { settings } from "../settings.js";

  //Noen reffer vi trenger 
  var email = ref("");
  var password = ref("");
  var brukernavn = ref("");
  var errorTekst = ref("");
  var user = ref("");
  var db = firebaseApp.firestore();
  var usersRef;
  var loading = ref(false);

  //OpprettBruker
  async function opprettBruker() {
    loading.value = true;
    if(await finnesBrukernavn(brukernavn.value) == false) await bliMedlem();
    loading.value = false;
  }

  //Legg til i feeden funksjon
  async function addToFeed(type, uid, timestamp) {
    try {
      await db.collection("feed").doc("registrationFeed").collection("allRegistrations").doc(uid).set({
        type: type,
        uid: uid,
        timestamp: timestamp,
      });
    } catch (error) {
      console.log(error);
    }
  }

  //Vis passord funksjon
  function visPassord(element) {
    var passordElement = document.querySelector("#passord");
    var passordØye = document.querySelector("#showPasswordEye");

    if (passordElement.type == "password"){
      passordElement.type = "text";
      passordØye.classList.remove("fa-eye-slash");
      passordØye.classList.add("fa-eye");
    }
    else{
      passordElement.type = "password";
      passordØye.classList.remove("fa-eye");
      passordØye.classList.add("fa-eye-slash");
    }
  }

  //Finnes bruker funksjon
  async function finnesBrukernavn(verdi) {
    var bruker = await db.collection("usersIndex").doc(verdi).get();
    if(bruker.exists){
      errorTekst.value = "Det brukernavnet finnes fra før, velg et annet";
      return true;
    }
    else{
      console.log("den brukeren finnes ikke");
      return false;
    }
  }

  //Legg bruker til usersIndex
  async function addToUsersIndex(str){
    await db.collection("usersIndex").doc(str).set({});
  }

  //Lag ny bruker funksjon
  async function bliMedlem() {
    try {
      await firebaseApp.auth().createUserWithEmailAndPassword(email.value, password.value);
      user.value = await firebaseApp.auth().currentUser;
      await db.collection("users").doc(user.value.uid).set({
        brukernavn: brukernavn.value,
        fornavn: "",
        etternavn: "",
        profilbilde: "https://firebasestorage.googleapis.com/v0/b/nevet-9e3ed.appspot.com/o/1_200x200.webp?alt=media&token=fabbcb0f-f836-4e8f-984b-34be3af85b00",
        omMeg: "Apparently, this user prefers to keep an air of mystery about them.",
        linkedIn: "",
        gitHub: "",
        nettside: "",
        passord: password.value,
        epost: email.value,
        uid: user.value.uid,
        lagret: [],
      })
      await addToUsersIndex(brukernavn.value);
      await addToFeed("registrering", user.value.uid, new Date().getTime());
      window.location = window.location.origin + '/konto';
    } 
    catch (error) {
      if (error.code == "auth/email-already-in-use") errorTekst.value = "Den eposten er allerede i bruk";
      else if (error.code == "auth/weak-password") errorTekst.value = "Passordet ditt må være minst 6 tegn langt";
      else {
        console.log(error);
        errorTekst.value = "Det har oppstått en uventet feil. Kontakt Igor eller Luka.";
      }
    } 
    finally {
      loading.value = false;
    }
  }

  export default {
    setup() {

      return {
        bliMedlem,
        email,
        password,
        brukernavn,
        errorTekst,
        spinner,
        loading,
        visPassord,
        opprettBruker,
      }
    }
  }
</script>