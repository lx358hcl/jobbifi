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
                <p class="mb-4 pb-2 login-card-description">Opprett en ny konto</p>
               <form method="post" v-on:submit.prevent="">
                  <div class="form-group">
                    <label for="email" class="sr-only">Email</label>
                    <input required type="email" name="email" id="email" class="form-control" placeholder="E-postadresse">
                  </div>
                  <div class="form-group mb-4">
                    <label for="username" class="sr-only">Brukernavn</label>
                    <input required type="username" name="username" id="username" class="form-control" placeholder="Brukernavn">
                  </div>
                  <div class="form-group mb-4">
                    <label for="password" class="sr-only">Password</label>
                    <input required type="password" name="password" id="password" class="form-control" placeholder="Passord">
                  </div>
                   <div class="form-group mb-4">
                    <label for="bekreftPassord" class="sr-only">Bekreft passord</label>
                    <input type="bekreftPassord" name="bekreftPassord" id="bekreftPassord" class="form-control" placeholder="Bekreft passord">
                  </div>
                  <button type="submit" id="bliMedlem" class="btn btn-block login-btn mb-4" >
                    <span>Opprett Konto</span>
                  </button>
                </form>
                <nav class="login-card-footer-nav logRegGreier">
                  <a href="#!">Retningslinjer og personvern</a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>

  <!--<div>
    <form @submit.prevent="bliMedlem();">
      Register
      <div class="email">
        <input type="email" v-model="email" placeholder="email" />
      </div>
      <div class="navn">
        <input type="text" v-model="displayName" placeholder="navn" />
      </div>
      <div class="fornavn">
        <input type="text" v-model="fornavn" placeholder="fornavn" />
      </div>
      <div class="pass">
        <input type="password" v-model="password" placeholder="password" />
      </div>
      <button type="submit">Register</button>
    </form>
  </div>-->
</template>

<script>
  import firebase from "../main.js";  
  import { ref } from "vue";
  export default {
    setup() {
      async function run(){
        var db = await firebase.firestore();
        var dbRes = await db.collection("users").get();
        dbRes.docs.forEach(e => console.log(e.data()))
        var igor = {
          "navn": "igor",
          "alder": 20,
          "venner": []
        }
        var luka = {
          "navn": "luka",
          "alder": 24,
          "venner": []
        }
        var data = {
          "navn": "thomas",
          "alder": 13,
          "venner": [luka, igor]
        }
        db.collection("users").doc("3").set(data);
        dbRes.docs.forEach(e => console.log(e.data()))
      }
      run();

      var email = ref("");
      var password = ref("");
      var displayName = ref("");
      var fornavn = ref(""); 

      async function bliMedlem() {
        await firebase.default.auth().createUserWithEmailAndPassword(email.value, password.value);
        window.location = window.location.origin + "/stillinger";
      }
      return {
        bliMedlem,
        email,
        password,
        displayName,
        fornavn,
      }
    }
  }
</script>