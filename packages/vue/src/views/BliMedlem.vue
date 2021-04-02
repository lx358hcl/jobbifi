<template>

    <div class="homepage loginSide d-flex align-items-center justify-content-center">
    <div class="my-5 container mx-5" style = "max-width:1000px;">
      <div class="card login-card">
        <div class="row no-gutters">
          <div class="col-md-5">
            <img src="../../public/lampe.jpg" alt="login" class="login-card-img">
          </div>
          <div class="col-md-7">
            <div class="container text-center">
              <div class="card-body">
                <div class="brand-wrapper">
                  <h1 id="velkomstMelding">
                    <b>~ Jobbifi&nbsp;</b> | &nbsp;<i>Registrer ~</i>
                  </h1>
                  <hr>
                </div>
                <p class="mb-4 pb-0 login-card-description">Opprett en ny konto</p>
               <form method="post" v-on:submit.prevent="bliMedlem();">
                  <div class="form-group mb-2">
                    <label for="email" class="sr-only">Email</label>
                    <input required type="email" v-model="email" name="email" id="email" class="form-control" placeholder="E-postadresse">
                  </div>
                  <div class="form-group mb-2">
                    <label for="username" class="sr-only">Brukernavn</label>
                    <input required type="username" v-model="brukernavn" name="username" id="username" class="form-control" placeholder="Brukernavn">
                  </div>
                  <div class="form-group mb-2">
                    <label for="password" class="sr-only">Password</label>
                    <input required type="password" v-model="password" name="password" id="password" class="form-control" placeholder="Passord">
                  </div>
                   <div class="form-group mb-2">
                    <label for="bekreftPassord" class="sr-only">Bekreft passord</label>
                    <input type="password" name="bekreftPassord" id="bekreftPassord" class="form-control" placeholder="Bekreft passord">
                  </div>
                    <div class="error" v-if="error">{{ error }}</div>           
                    <br>
                  <button type="submit" id="bliMedlem" class="logRegGreier btn btn-block login-btn mb-4" >
                    <spinner v-if="settings.loading" class = "loadingSpinner"></spinner>
                    <span v-else>Opprett Konto</span>
                  </button>
                </form>
                <nav class="login-card-footer-nav logRegGreier">
                  <router-link to="/retningslinjer">Retningslinjer og personvern</router-link>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import firebase from "../main.js";  
  import { ref } from "vue";
  import spinner from "../components/spinner.vue";
  import { settings } from "../settings.js";
  export default {
    setup() {
      //Noen reffer vi trenger 
      var email = ref("");
      var password = ref("");
      var brukernavn = ref("");
      var error = ref("");

      //Lag ny bruker funksjon
      async function bliMedlem() {
        try{
          settings.value.loading = true;
          var creds = await firebase.default.auth().createUserWithEmailAndPassword(email.value, password.value);
          var user = await firebase.default.auth().currentUser;
          var db = await firebase.firestore();
          await db.collection("users").doc(user.uid).set({
            username: brukernavn.value,
          })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
          window.location = window.location.origin + `/secret`;
        }
        catch(e){
          error.value = e.message;
        }
        finally{
          settings.value.loading = false;
        }
      }
      return {
        bliMedlem,
        email,
        password,
        brukernavn,
        error,
        spinner,
        settings,
      }
    }
  }
</script>