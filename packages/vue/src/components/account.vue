<template>
    <div class="dropdown bossButton" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <a class="outerButton h-100 d-flex justify-content-center align-items-center" href="#">
            <div class="innerButton d-flex justify-content-center ">
                <i style = "margin-top: 1px; padding-left:13px;" class="fas fa-bars moreIcon float-left"></i>
                <div>
                    <div v-if="loading">
                        <spinner></spinner>
                    </div>
                    <div v-else>
                        <img v-if="profilBilde" class = "navProfilBilde d-flex align-items-center" style="border-radius:100px" :src="profilBilde">
                        <i v-else class="fas fa-user-circle"></i>
                    </div>
                </div>
            </div>
        </a>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <div class="d-flex justify-content-center">
                <div style = "letter-spacing:0px" v-if="user">
                    <router-link class="accountText py-1 dropdown-item" to="/dashboard" href="#" >Konto </router-link>
                    <hr style="" class="mx-3 my-2">
                    <a href="#" @click="logOut();" class="dropdown-item accountText"> Logg ut </a>
                </div>
                <div v-else>
                    <router-link class="accountText py-1 dropdown-item" to="/login"> Login </router-link>
                    <router-link class="accountText py-1 dropdown-item" to="/blimedlem"> Bli medlem </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    //Import firebase
    import firebaseApp from "../../../firebase/firebaseconfig.js";
    import firestore from 'firebase/firestore';
    import { ref } from "vue";
    import spinner from "./spinner.vue";
    import notification from "./notification.vue";
    var user = ref("");
    var profilBilde = ref("");
    var db = "";
    var dbInfo = "";
    var loading = ref(true);
    
    //Logg ut funksjon
    function logOut() {
        firebaseApp.auth().signOut();
        window.location = window.location.origin + "/login";
    }
    //Setup funksjon
    export default {
        setup() {
            
            async function getInfo(){
                user.value = await firebaseApp.auth().currentUser;
                if(user.value){
                    db = await firebaseApp.firestore();
                    dbInfo = await db.collection("users").doc(user.value.uid).get();
                    dbInfo = await dbInfo.data();
                    profilBilde.value = dbInfo.profilbilde + new Date().getTime();
                    console.log(profilBilde);
                    loading.value = false;
                }
                else loading.value = false;
            }
            getInfo();
            
            return {
                user,
                logOut,
                profilBilde,
                loading,
                spinner,
                notification,
            }
        }
    }
</script>