<template>
    <div class="dropdown bossButton" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <a class="outerButton h-100 d-flex justify-content-center align-items-center" href="#">
            <div class="innerButton">
                <i class="fas fa-bars moreIcon"></i>
                <div>
                    <img v-if="false" src="https://a0.muscache.com/im/pictures/user/3b988e75-6db4-41f5-a458-18be84ec0d31.jpg?aki_policy=profile_medium">
                    <i class="fas fa-user-circle"></i>
                </div>
            </div>
        </a>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <div class="d-flex justify-content-center">
                <div v-if="user">
                    <router-link to="/secret" href="#" class="dropdown-item">{{ user.email.slice(0, user.email.indexOf("@"))}}</router-link>
                    <router-link class="dropdown-item" to="/varsler"> Varsler
                        <span class="badge badge-danger" style="position: relative; bottom: 10px; padding-top: 3px; padding-right: 3px; right: 3px; padding-left: 5px; border-radius: 0px;">32</span>
                    </router-link>
                    <router-link class="dropdown-item" to="/meldinger"> Meldinger
                        <span class="badge badge-danger" style="position: relative; bottom: 10px; padding-top: 3px; padding-right: 3px; right: 3px; padding-left: 5px; border-radius: 0px;">32</span>
                    </router-link>
                    <hr style="" class="mx-3 my-2">
                    <router-link class="dropdown-item" to="/lagrede"> Lagret </router-link>
                    <router-link class="dropdown-item" to="/innstillinger"> Innstillinger </router-link>
                    <a href="#" @click="logOut();" class="dropdown-item"> Logg ut </a>
                </div>
                <div v-else>
                    <router-link class="dropdown-item" to="/login"> Login </router-link>
                    <router-link class="dropdown-item" to="/blimedlem"> Bli medlem </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    //Import firebase
    import * as firebase from "firebase";
    //Logg ut funksjon
    function logOut() {
        firebase.default.auth().signOut();
        window.location = window.location.origin + "/logout";
    }
    //Setup funksjon
    export default {
        setup() {
            var user = firebase.default.auth().currentUser;
            return {
                user,
                logOut,
            }
        }
    }
</script>

<style>
    .outerButton {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 90px !important;
        height: 45px !important;
        background-color: #fff;
        border-radius: 105px;
        margin-left: 30px;
        margin-right: 15px;
        box-shadow: 0px 0px 4px 0px rgb(0 0 0 / 65%);
    }
    .outerButton:active {
        box-shadow: 0px 0px 3px 0px rgb(0 0 0 / 65%);
        transform: scale(0.99);
    }
    .outerButton>a {
        text-decoration: none;
        color: transparent;
    }
    .innerButton {
        display: inherit;
        justify-content: space-between;
        align-items: inherit;
        width: 100%;
        height: 100%;
        padding: 5px;
        margin-left: 5px;
    }
    .innerButton>* {
        padding: 0 10px 0 10px;
        font-size: 26px;
        color: #313131;
    }
    .bossButton .dropdown-menu {
        min-width: 100px !important;
        margin: 10px !important;
        padding: 10px !important;
        border-radius:10px;
        left:-20px !important;
    }
    .bossButton .dropdown-menu .dropdown-item{
        background-color:transparent;
    }
    .dropdown-menu .dropdown-item:active {
        color: black;
        background-color: none !important;
        transform: scale(0.97) !important;
    }
    .dropdown-menu .dropdown-item:hover {
        border-radius: 10px;
        font-weight: 900 !important;
        left: -20px;
        background-color: #fff;
    }
    .moreIcon {
        font-size: 16px;
    }
</style>