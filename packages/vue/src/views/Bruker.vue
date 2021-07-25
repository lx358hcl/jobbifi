<template >
<main class="d-flex align-items-center justify-content-center" style="min-height: calc(100vh - 294px);">
<div v-if="loading" class = "d-flex justify-content-center">
    <spinner class = "d-flex justify-content-center"></spinner>
</div>
  <section v-else class="clean-block clean-form dark d-flex align-items-center w-100" style="padding-bottom: 0px;min-height: calc(100vh - 200px);background: rgb(255,255,255);">
      <div class="container">
        <div class="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-1 row-cols-xl-1 justify-content-center" style="margin-top: 50px;margin-bottom: 50px;">
            <div class="d-flex justify-content-center mt-0 col-12 col-sm-12 col-md-10 col-lg-6 col-xl-6" id="profilSideBilde" style="padding-right: 20px;padding-left: 20px;border-radius: 5px;height: 100%;">
                <div class="card m-0 p-0" style="border-style: none;">
                    <div class="card-body m-0 p-0 d-flex flex-column justify-content-center text-center">
                        <div class = "py-5 px-3">
                            <div v-if="userInfo">
                                <div class="d-flex justify-content-center">
                                    <div class="img-fluid" id = "" data-bss-hover-animate="pulse" v-bind:style="{ backgroundImage: 'url(' + profilbilde + ')' }" style="background-repeat: no-repeat; background-size: cover; width:220px; height:220px; border-radius: 156px;box-shadow: 0px 0px 4px 1px rgba(82,82,82,0.87);border: 1px none rgb(79,79,79);"></div>
                                </div>
                                <span style = "margin-left:130px; margin-top:-50px; border:5px solid white; width:50px !important; height:50px;" :class = "{'badge-success': active, 'badge-danger': !active}" class="badge d-inline-block badge-pill">&nbsp;&nbsp;&nbsp;</span>
                                <h4 class="text-center card-title" style="margin-top: 20px;font-weight: 900;margin-bottom: 20px;font-family: lato;">{{ brukernavn }}</h4>
                                <!--<button v-if = "user" @click = "startChat()" type="button" class="btn font-weight-bold btn-dark px-4" style = "font-family:Lato;"><i class="far fa-comment-dots"></i> Chat </button>-->
                                <h6 class="text-muted card-subtitle mb-2 mt-4" style="color: rgb(37,37,37) !important;font-weight: 600;text-align: center;font-family: Lato;">OM MEG</h6>
                                <hr>
                                <p class="pb-3 pr-3 pl-3 pt-0 card-text text-center" style="text-align: left;" v-html="omMeg"></p>
                                <p style="display:block; margin: 12px 0px 16px;margin-top: 12px;font-size: 20px;font-family: Lato;font-weight: 900;margin-bottom: 12px;">Lenker og sånt</p>
                                <hr>
                                <div class="social-icons d-flex justify-content-center align-center">
                                    <a href="https://www.linkedin.com/in/luka-momcilovic-835b37194/">
                                        <i style = "color: #0a66c2;" class="icon ion-social-linkedin sosialKnapp d-flex align-items-center justify-content-center"></i>
                                    </a>
                                    <a href="https://github.com/lukamo1996">
                                        <i style = "color: #2f2f2f;" class="icon ion-social-github sosialKnapp d-flex align-items-center justify-content-center"></i>
                                    </a>
                                </div>
                            </div>
                            <p v-else class = "d-flex justify-content-center">Denne brukeren finnes ikke/har blitt slettet. </p>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
      </div>
  </section>
</main>

</template>
<script>
    //Importer ting og sånn
    import { ref } from "vue";
    import firebaseApp from "../../../firebase/firebaseconfig.js";
    import firestore from 'firebase/firestore';
	import router from '../router/index.js';
    import spinner from "../components/spinner.vue";
    import firebase from 'firebase';
    import commentSection from "../components/commentSection.vue";
    import { settings } from "../settings.js";

    //Reffer som trengs
    var email = ref("");
    var brukernavn = ref("");
    var fornavn = ref("");
    var etternavn = ref("");
    var profilbilde = ref("");
    var omMeg = ref("");
    var linkedIn = ref("");
    var gitHub = ref("");
    var nettside = ref("");
    var placeHolder = ref("");
    var userInfo = ref(""); 
    var user = ref("");
    var loading = ref(true);
    var db = firebaseApp.firestore();
    var active = ref(false);

    //Get info for the given user
    async function getInfoForUser(){
        //Start loadingspinner
        loading.value = true;

        //Get user-info
        user.value = await firebaseApp.auth().currentUser;
        var users = await db.collection("users").where("brukernavn", "==", router.currentRoute.value.params.brukernavn).get();
        console.log(users.docs);
        if(users.docs.length != 0){
            userInfo.value = users.docs[0].data();

            //Set reffene til verdiene
            email.value = userInfo.value.epost;
            brukernavn.value = userInfo.value.brukernavn;
            fornavn.value = userInfo.value.fornavn;
            etternavn.value = userInfo.value.etternavn;
            profilbilde.value = userInfo.value.profilbilde;
            omMeg.value = userInfo.value.omMeg;
            linkedIn.value = userInfo.value.linkedIn;
            gitHub.value = userInfo.value.gitHub;
            nettside.value = userInfo.value.nettside;

            //Er bruker pålogget?
            var currentDate = new Date().getTime();
            var lastActiveTime = userInfo.value.active.toDate().getTime();
            var diff = currentDate - lastActiveTime;
            if(diff < 60000) active.value = true;
            else active.value = false;

        }
        //Avslutt loading spinner
        loading.value = false;
    }

    export default {
    setup() {
        async function startChat(){
            var senderID = user.value.uid;
            var sender = await db.collection("users").doc(senderID).get();
            var senderBrukernavn = sender.data().brukernavn;
            var mottaker = await db.collection("users").where("brukernavn", "==", router.currentRoute.value.params.brukernavn).get();
            var mottakerData = mottaker.docs[0].data();
            var mottakerID = mottakerData.uid;

            //Først sjekker vi om chatten finnes fra før
            console.log(senderID);
            console.log(mottakerID);
            var res = await db.collection("chats").where(`deltakere.${senderID}`, "==", true).where(`deltakere.${mottakerID}`, "==", true).get();
            var res2 = await db.collection("chats").where(`deltakere.${senderID}`, "==", false).where(`deltakere.${mottakerID}`, "==", true).get();
            var res3 = await db.collection("chats").where(`deltakere.${senderID}`, "==", false).where(`deltakere.${mottakerID}`, "==", false).get();

            if(res.docs.length > 0 && res.docs[0].exists){
                console.log(res.docs);
                router.push({ name: 'Dashboard', query: { side: 'meldinger', chatID: res.docs[0].id }});
            }
            else if(res2.docs.length > 0 && res2.docs[0].exists){
                await db.collection("chats").doc(res2.docs[0].id).update({
                    [`deltakere.${senderID}`]:true,
                    [`deltakere.${mottakerID}`]:true,
                })
                router.push({ name: 'Dashboard', query: { side: 'meldinger', chatID: res2.docs[0].id }});
            }
            else if(res3.docs.length > 0 && res3.docs[0].exists){
                await db.collection("chats").doc(res3.docs[0].id).update({
                    [`deltakere.${senderID}`]:true,
                    [`deltakere.${mottakerID}`]:true,
                })
                setTimeout(function(){
                    router.push({ name: 'Dashboard', query: { side: 'meldinger', chatID: res3.docs[0].id }});
                }, 300)
            }
            else{
                //Start chat
                var nyChat = await db.collection("chats").doc();
                await nyChat.set({
                    starter: senderID,
                    starterBrukernavn: senderBrukernavn,
                    mottaker: mottakerID,
                    mottakerBrukernavn: mottakerData.brukernavn,
                    deltakere: {
                        [senderID]: true,
                        [mottakerID]: true,
                    },
                    lastSentMessage: firebase.firestore.FieldValue.serverTimestamp(),
                    lastMessage: "",
                    lastMessageID: "",
                    lastMessageUser:"",
                    lastMessageChatID:nyChat.id,
                });
                router.push({ name: 'Dashboard', query: { side: 'meldinger'}})
            }
        }

        getInfoForUser();
        return {
            email,
            brukernavn,
            fornavn,
            etternavn,
            profilbilde,
            omMeg,
            linkedIn,
            gitHub,
            nettside,
            userInfo,
            spinner,
            commentSection,
            user,
            loading,
            startChat,
            active,
        }
    }
}
</script>