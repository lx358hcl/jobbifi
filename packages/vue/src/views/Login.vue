<template>
  <div class="homepage loginSide d-flex align-items-center justify-content-center">
    <div class="my-5 container mx-5" style = "max-width:1000px;">
      <div class="card login-card">
        <div class="row no-gutters">
          <div class="col-md-5">
            <img src="../../public/123.gif" alt="login" class="login-card-img">
          </div>
          <div class="col-md-7">
            <div class="container text-center">
              <div class="card-body">
                <div class="brand-wrapper">
                  <h1 id="velkomstMelding">
                    <b>~ Jobbifi&nbsp;</b> | &nbsp;<i>Login ~</i>
                  </h1>
                  <hr>
                </div>
                <p class="mb-4 pb-0 login-card-description">Login på kontoen din</p>
                <form v-on:submit.prevent="login()">
                  <div class="form-group">
                    <label for="email" class="sr-only">Email</label>
                    <input required v-model="email" type="email" name="email" id="email" class="form-control" placeholder="E-postadresse">
                  </div>
                  <div class="form-group mb-0 pb-0">
                    <label for="password" class="sr-only">Password</label>
                    <input required v-model="password" type="password" name="password" id="password" class="form-control mb-3" placeholder="Passord">
                  </div>
                    <p class="error mb-3 py-1" v-if="true">{{ error }}</p>   

                    <button type="submit" id="login" class="logRegGreier btn btn-block login-btn mb-4" >
                      <span>Login</span>
                    </button>
                  </form>
                <a href="#!" class="forgot-password-link logRegGreier">Glemt passordet?</a>
                <p class="mt-3 mb-3 login-card-footer-text logRegGreier"><a href="#!" class="text-reset">Har du ikke bruker? Lag bruker her</a></p>
                <nav class="login-card-footer-nav logRegGreier">
                  <router-link to="/retningslinjer" href="#!">Retningslinjer og personvern</router-link>
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
  import * as firebase from "firebase/app";
  import { ref } from "vue";
  export default {
    setup() {
      var email = ref("");
      var error = ref("");
      var password = ref("");
      async function login() {
        try{
          await firebase.default.auth().signInWithEmailAndPassword(email.value, password.value);
          window.location = window.location.origin + "/secret";
        }
        catch(e){
          error.value = e.message;
          console.log(error.value);
        }
        
      }
      return {
        login,
        email,
        password,
        error,
      }
    }
  }
</script>

<style>
  .loginGreie>* {
    font-family: "Karla" !important;
    background-color: #fff;
  }
  .brand-wrapper {
    margin-bottom: 19px;
  }
  .brand-wrapper .logo {
    height: 37px;
  }
  .login-card {
    border: 0;
    border-radius: 27.5px;
    box-shadow: 0 10px 30px 0 rgba(172, 168, 168, 0.43);
    overflow: hidden;
  }
  .login-card-img {
    border-radius: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
  }
  .login-card .card-body {
    padding: 85px 30px 60px;
  }
  @media (max-width: 422px) {
    .login-card .card-body {
      padding: 35px 24px;
    }
  }
  .login-card-description {
    font-size: 25px;
    color: #000;
    font-weight: normal;
    margin-bottom: 23px;
  }
  .login-card .form-control {
    border: 1px solid #d5dae2;
    padding: 15px 25px;
    margin-bottom: 28px;
    min-height: 45px;
    font-size: 13px;
    line-height: 15;
    font-weight: normal;
  }
  .login-card .form-control::-webkit-input-placeholder {
    color: #919aa3;
  }
  .login-card .form-control::-moz-placeholder {
    color: #919aa3;
  }
  .login-card .form-control:-ms-input-placeholder {
    color: #919aa3;
  }
  .login-card .form-control::-ms-input-placeholder {
    color: #919aa3;
  }
  .login-card .form-control::placeholder {
    color: #919aa3;
  }
  .login-card .login-btn {
    padding: 13px 20px 12px;
    background-color: #000;
    border-radius: 4px;
    font-size: 17px;
    font-weight: bold;
    line-height: 20px;
    color: #fff;
    margin-bottom: 24px;
  }
  .login-card .login-btn:hover {
    border: 1px solid #000;
    background-color: transparent;
    color: #000;
  }
  .login-card .forgot-password-link {
    font-size: 14px;
    color: #919aa3;
    margin-bottom: 12px;
  }
  .login-card-footer-text {
    font-size: 16px;
    color: #0d2366;
    margin-bottom: 60px;
  }
  @media (max-width: 767px) {
    .login-card-footer-text {
      margin-bottom: 24px;
    }
  }
  .login-card-footer-nav a {
    font-size: 14px;
    color: #919aa3;
  }
  /*# sourceMappingURL=login.css.map */
</style>