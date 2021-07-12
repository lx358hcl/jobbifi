<template>
    <div class="col-12 m-0 p-0 d-flex justify-content-start w-100 h-100">
        <div class="container-fluid m-0 p-0 h-100">
            <div class="row w-100 m-0 h-100">
                <div style="border-right:2px solid #eaeaea;" class="col-3 h-100 m-0 p-0">
                    <div class="row w-100 m-0">
                        <div class="col-12 px-3 py-2 m-0">
                            <h3 style = "font-family: Lato" class="m-0 p-1 font-weight-bold">Chatter</h3>
                        </div>
                    </div>
                    <div class="row w-100 m-0">
                        <div class="col-12 m-0 p-0 d-flex justify-content-start flex-row">
                            <div v-if="Object.values(allSaved).length > 0" class="col-12 py-2 mx-0 px-0" role="group" aria-label="Basic example">
                                <div v-for="(val, k) in allSaved" class="row w-100 m-0 p-0">
                                    <button @click="hentChat(k, val);" type="button" class="btn m-0 p-0 w-100 d-flex align-items-center meldingKomponent" :key="k">
                                        <div class = "col-12 mt-0 py-0 d-flex flex-column pl-3">
                                            <MeldingKomponent :id = "k" :melding = "val"></MeldingKomponent>
                                        </div>
                                    </button>
                                </div>
                            </div>
                            <div v-if="loading" class="col-12 d-flex align-items-center justify-content-center">
                                <spinner></spinner>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-9 m-0 p-0">
                    <ChatForDashboard :details = "valgtChatDetails" :chat="valgtChat"></ChatForDashboard>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import MeldingKomponent from "../components/MeldingKomponent.vue";
    import ChatForDashboard from "./ChatForDashboard.vue";
    import firebaseApp from "../../../firebase/firebaseconfig.js";
    import firestore from 'firebase/firestore';
    import { ref } from "vue";
    import spinner from '../components/spinner.vue';
    import { useRouter, useRoute } from 'vue-router'

    var db = firebaseApp.firestore();
    var allSaved = ref({});
    var profilBilder = {};
    var chatsRef = db.collection("chats");
    var usersRef = db.collection("users");

    export default {
        setup(props) {
            var valgtChat = ref([]);
            var valgtChatDetails = ref(null);

            var user = firebaseApp.auth().currentUser;
            async function hentChat(id, val) {
                valgtChat.value = [];
                var innhold = await chatsRef.doc(id).collection("meldinger").get();
                for (let j = 0; j < innhold.docs.length; j++) {
                    valgtChat.value.push(innhold.docs[j].data());
                }
                valgtChatDetails.value = val;
                console.log(valgtChat.value);
            }
            async function getInfo() {
                var chats = await chatsRef.where("deltakere", "array-contains", user.uid).get();
                var chatsData = {};
                var mottakerProfilBilde;
                var starterProfilBilde;
                var chatInnhold;
                var mottaker;
                var starter;
                var alleredeHentet = false;
                //Get shallow chat content
                for (let i = 0; i < chats.docs.length; i++) {
                    chatInnhold = chats.docs[i].data();
                    mottaker = chatInnhold.mottaker;
                    starter = chatInnhold.starter;
                    if (mottaker in profilBilder) {
                        mottakerProfilBilde = profilBilder[mottaker];
                    }
                    if (chatInnhold.starter in profilBilder) {
                        starterProfilBilde = profilBilder[starter];
                    } else {
                        mottakerProfilBilde = "https://firebasestorage.googleapis.com/v0/b/nevet-9e3ed.appspot.com/o/" + chatInnhold.mottaker + "_200x200" + ".webp" + "?alt=media&token=" + new Date().getTime(),
                            starterProfilBilde = "https://firebasestorage.googleapis.com/v0/b/nevet-9e3ed.appspot.com/o/" + chatInnhold.starter + "_200x200" + ".webp" + "?alt=media&token=" + new Date().getTime(),
                            profilBilder[mottaker] = mottakerProfilBilde;
                        profilBilder[starter] = starterProfilBilde;
                    }
                    chatsData[chats.docs[i].id] = chatInnhold;
                    chatsData[chats.docs[i].id]["mottakerProfilBilde"] = (alleredeHentet == false) ? profilBilder[mottaker] + "1" : profilBilder[mottaker];
                    chatsData[chats.docs[i].id]["starterProfilBilde"] = (alleredeHentet == false) ? profilBilder[starter] + "1" : profilBilder[starter];
                    chatsData[chats.docs[i].id]["thisUser"] = user.uid;
                }
                console.log(chatsData);
                //Hent id-en til alle samtalene til den gitte brukeren 
                var keys = Object.keys(chatsData);
                //Hent innholdet i alle chat-id-ene
                for (let i = 0; i < keys.length; i++) {
                    var innhold = await chatsRef.doc(keys[i]).collection("meldinger").get();
                    // for(let j = 0; j < innhold.docs.length; j++){
                    try {
                        chatsData[keys[i]]["meldinger"] = (chatsData[keys[i]]["meldinger"] || []).concat(innhold.docs[0].data());
                    } catch {};
                    // }
                }
                console.log(chatsData);
                allSaved.value = chatsData;
            }
            getInfo();
            return {
                allSaved,
                MeldingKomponent,
                hentChat,
                ChatForDashboard,
                valgtChat,
                valgtChatDetails,
            }
        }
    }
</script>