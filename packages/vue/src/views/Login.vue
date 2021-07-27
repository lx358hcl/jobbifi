<template>
  <section class="login-clean loginRegister fyllSkjermen d-flex align-items-center">
    <div class="container">
      <div class="row no-gutters row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 justify-content-center" style="">
        <div class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" style="border-bottom-left-radius: 30px; border-top-left-radius: 30px; padding-right: 0px;padding-left: 0px; background: url(assets/img/123.gif) no-repeat center center; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;">
        </div>
        <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6" style="padding-right: 0px;padding-left: 0px;">
          <form v-on:submit.prevent="login()" class="loginRegisterFormene d-flex flex-column justify-content-center align-content-center" id="loginBoks" method="post">
            <h2 class="sr-only">Login Form</h2>
            <div class="illustration">
              <p style="font-family: 'Goudy Bookletter 1911', serif !important; color: rgb(45,45,45);font-weight: 900;margin-bottom: 0px;" class = "animate__animated animate__slower animate__swing">&amp;</p>
              <hr>
              <p style="color: rgb(20,20,20);font-family: Spectral, serif;font-size: 20px;font-style: italic;text-align: center;"><strong>Login på kontoen din</strong></p>
              <hr>
            </div>
            <div class="form-group">
              <input class="form-control" required v-model="email" type="email" name="email" placeholder="E-post" style="font-family: Lato, sans-serif;font-weight: normal;">
            </div>
            <div class="form-group">
              <div id="visPassord" class="d-flex justify-content-center align-items-center" style="cursor:pointer; background: rgb(247,249,252); border-bottom: 1px solid rgb(223,231,241);height: 100%;">
                <input id = "passord" required type="password" class="form-control" v-model="password" name="password" placeholder="Passord" style="font-family: Lato, sans-serif;font-weight: normal; " />
                <i @click="visPassord" id = "showPasswordEye" style = "width:35px;" class="fas fa-eye-slash" ></i>
              </div>
            </div>
            <div class="form-group">
              <button class="btn btn-primary btn-block" type="submit" style="color: rgb(255, 255, 255);background: #212529;font-family: Lato, sans-serif;font-weight: bold;">
                <spinner class = "loadingSpinner" v-if="settings.loading"></spinner>
                <span v-else>Login</span>
              </button>
            </div>
            <p class="error mb-3 py-1 text-center text-danger" v-if="true">{{ error }}</p>
            <router-link class="forgot hitLinks" to="/glemtpassord" style="font-family: Lato, sans-serif;font-weight: normal;padding: 5px;">Glemt passordet?</router-link>
            <router-link class="forgot hitLinks" to="/blimedlem" style="font-family: Lato, sans-serif;font-weight: normal;padding: 5px;">Har du ikke en bruker? Lag bruker her</router-link>
            <router-link class="forgot hitLinks" to="/retningslinjer" style="font-family: Lato, sans-serif;font-weight: normal;padding: 5px;">Retningslinjer og personvern</router-link>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import firebaseApp from "../../../firebase/firebaseconfig.js";
  import { ref } from "vue";
  import { settings } from "../settings.js";
  import spinner from "../components/spinner.vue";
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
  export default {
    setup() {
      var email = ref("");
      var error = ref("");
      var password = ref("");
      settings.value.loading = false;
      async function login() {
        try {
          settings.value.loading = true;
          await firebaseApp.auth().signInWithEmailAndPassword(email.value, password.value);
          router.push({ name: 'Dashboard', query: { side: 'profil' }});
        } catch (e) {
          switch(e.code){
            case "auth/user-not-found":
              error.value = "Den brukeren finnes ikke";
              
            break;
            default:
            error.value = "Feil passord buddy. Har du glemt det igjen? :(";
            break;
          }
        } finally {
          settings.value.loading = false;
        }
      }
      return {
        login,
        email,
        password,
        error,
        settings,
        spinner,
        visPassord,
      }
    }
  }
</script>