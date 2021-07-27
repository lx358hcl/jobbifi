<template>
  <main class="container center">
    <div class="row beholder center">
      <div class="col-12">
       <h2 class = "text-center">
        <strong style="font-family: 'Goudy Bookletter 1911', serif !important">
          Glemt passordet?
        </strong>
      </h2>
      <form method="post" v-on:submit.prevent="resetPassword()">
        <div>
          <div class="form-group">
            <hr>
            <div class="col-sm-12 p-0">
              <input required type="text" class="form-control py-4 mb-4 w-100 mt-4" id="navn" v-model="epost" placeholder="Epost til brukeren din">
            </div>
          </div>
          <p class = "text-center p-0 m-0 feilMelding"></p>
          <div class="form-group glemtPassordMelding">
            <p class = "text-center m-0 pb-2"></p>
            <div class="d-flex justify-content-center align-items-center col-sm-offset-2 col-sm-12 p-0 w-100">
                <button type="submit" class="btn btn-dark p-3 mt-3">
                  <span v-if="loading == false">Tilbakestill passord</span>
                  <spinner v-else></spinner>
                </button>
            </div>
          </div>
        </div>
      </form>
    </div>
    </div>
  </main>
</template>

<script>
    import axios from "axios";
    import { ref } from "vue";
    import firebaseApp from "../../../firebase/firebaseconfig.js";
    import spinner from "../components/spinner.vue";
    var epost = ref("");
    var loading = ref(false);

    export default {
        setup() {
            function resetPassword() {
              loading.value = true;
                var auth = firebaseApp.auth().sendPasswordResetEmail(epost.value).then(function() {
                    document.querySelector(".glemtPassordMelding").textContent = "Vi har sendt deg en e-post for å tilbakestille passordet ditt. Sjekk søppelposten din, mulig den kommer der";
                    
                }).catch(function(error) {
                  
                  document.querySelector(".feilMelding").textContent = "Den brukeren finnes ikke";
                  loading.value = false;
                });
            }
            return { 
                epost,
                resetPassword,
                spinner,
                loading,
            }
        }
    }
</script>