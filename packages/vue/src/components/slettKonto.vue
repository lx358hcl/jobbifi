<template>
  <div class="d-flex text-left">
    <p class="text-muted text-danger card-subtitle mt-1" style="color: rgb(37,37,37) !important; text-align: left;font-family: Lato;">
      <b @click="slettKonto" id = "slettKonto" class="clickable hover text-danger">Slett konto</b>     
    </p>
  </div>
</template>

<script>
  //Importer greier som trengs
  import firebaseApp from "../../../firebase/firebaseconfig.js";
  import firestore from 'firebase/firestore';
  import { ref } from "vue";

  //Variabler og moduler
  var antallTrykk = 0;
  var loading = ref(false);

  //Slett konto funksjon
  async function slettKonto(event) {
    //Ting som trengs
    var user = await firebaseApp.auth().currentUser;
    var db = firebaseApp.firestore();
    antallTrykk++;

    if(antallTrykk == 1){
      //Bekreft passord seksjon
      var bekreftSeksjon = 
      ` <b id = "slettKonto" class="hover text-danger">Skriv inn JA i boksen nedenfor og trykk på Slett Konto</b>
        <div class="input-group mb-3 mt-3 w-50">
          <input id = "bekreftPassordFelt" type="text" class="form-control rounded" placeholder="" aria-label="" aria-describedby="basic-addon1">
          <div class="input-group-prepend ml-3">
            <button class="btn btn-danger rounded" type="button">Slett Konto</button>
          </div>
        </div>
      `;
      $("#slettKonto").text("Sikker?");
      $("#slettKonto").append(bekreftSeksjon);
    }
    else{
      if($("#bekreftPassordFelt").val() == "JA"){
        //Start loaderen
        loading.value = true;

        //Skaff gitt bruker og passordet først
        var userInfo = await db.collection("users").doc(user.uid).get();
        userInfo = userInfo.data();

        //Slett bruker fra firestore først
        await db.collection("users").doc(user.uid).delete();

        // //Slett bruker fra feeden
        await db.collection("feed").doc("registrationFeed").collection("allRegistrations").doc(user.uid).delete();

        //Re-authenticate brukeren
        await firebaseApp.auth().signInWithEmailAndPassword(user.email, userInfo.passord).then((userCredential) => {
          user = userCredential.user;
          console.log(userCredential);
        });
        
        //Slett bruker fra selve firebasen
        await user.delete();

        //Avslutt loader
        loading.value = false;

        //Redirect brukeren
        window.location = "/";
      }
    }
  }


  export default {
    setup() {

      return{
        slettKonto,
        loading,
      }
    }
  }
</script>