<template>
    <div class="dropdown outerButton" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <a class="w-100 h-100 d-flex justify-content-center align-items-center" href="#">
            <div class="innerButton">
                <i class="fas fa-bars moreIcon"></i>
                <div>
                    <img v-if="false" src="https://a0.muscache.com/im/pictures/user/3b988e75-6db4-41f5-a458-18be84ec0d31.jpg?aki_policy=profile_medium">
                    <i class="fas fa-user-circle"></i>
                </div>
            </div>
            <div style="border-radius: 20px;" class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <div v-if="user">
                    <router-link to="/secret" href="#" class="dropdown-item">{{ user.email.slice(0, user.email.indexOf("@"))}}</router-link>
                    <router-link class="dropdown-item" to="/varsler"> Varsler
                        <span class="badge badge-danger" style="position: relative; bottom: 10px; padding-top: 3px; padding-right: 3px; right: 3px; padding-left: 5px; border-radius: 20px;">32</span>
                    </router-link>
                    <router-link class="dropdown-item" to="/meldinger"> Meldinger
                        <span class="badge badge-danger" style="position: relative; bottom: 10px; padding-top: 3px; padding-right: 3px; right: 3px; padding-left: 5px; border-radius: 20px;">32</span>
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
        </a>
    </div>
</template>

<script>
    import * as firebase from "firebase";
    function logOut() {
        firebase.default.auth().signOut();
        window.location = window.location.origin + "/logout";
    }
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
        width: 90px;
        height: 45px;
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
    }
    .innerButton>* {
        padding: 0 10px 0 10px;
        font-size: 26px;
        color: #313131;
    }
    .moreIcon {
        font-size: 16px;
    }
</style>