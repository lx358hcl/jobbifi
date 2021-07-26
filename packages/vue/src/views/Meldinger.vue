<template>
    <div class="col-12 m-0 p-0 d-flex justify-content-start w-100 h-100">
        <div class="container-fluid m-0 p-0 h-100">
            <div class="row w-100 m-0 h-100">
                <div style="border-right:2px solid #eaeaea;" class="col-3 h-100 m-0 p-0">
                    <div class="row w-100 m-0">
                        <div class="col-12 px-3 py-2 m-0">
                            <h3 style="font-family: Lato" class="m-0 p-1 font-weight-bold">Chatter</h3>
                        </div>
                    </div>
                    <div style="max-height:80vh; overflow-y: scroll;" class="row w-100 m-0">
                        <div class="col-12 m-0 p-0 d-flex justify-content-start flex-row">
                            <div class="col-12 py-2 mx-0 px-0" role="group" aria-label="Basic example">
                                <div v-for="(val, index) in Object.values(allSaved).sort((a, b) => b.lastSentMessage - a.lastSentMessage)" class="row w-100 m-0 p-0">
                                    <button @click="hentChat(val.lastMessageChatID, val);" type="button" class="btn m-0 p-0 w-100 d-flex align-items-center meldingKomponent">
                                        <div v-if = "valgtChatDetails" :class = "{ aktivSamtale: val.lastMessageChatID == valgtChatDetails.chatID }" class = "col-12 mt-0 py-0 d-flex flex-column">
                                            <MeldingKomponent :id="valgtChatDetails.chatID" :now = "now" :user="allebrukereManChatterMed[user.uid]" :bruker="allebrukereManChatterMed[(user.uid == val.mottaker ? val.starter : val.mottaker)]" :key = "val" v-bind:melding = "val" :allebrukereManChatterMed="allebrukereManChatterMed" :valgtChat="valgtChatDetails"></MeldingKomponent>
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
                    <ChatForDashboard v-if = "valgtChatDetails" :now="now" :key = "valgtChatDetails.chatID" @fjernaChat="fjernChat" :details="valgtChatDetails" v-bind:chat="valgtChat" :allebrukereManChatterMed="allebrukereManChatterMed"></ChatForDashboard>
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
    import firebase from 'firebase';
    import { ref, onMounted, watch } from "vue";
    import spinner from '../components/spinner.vue';
    import { useRouter, useRoute } from 'vue-router'
    // const sound = require("../../public/mm.mp3");

    export default {
        setup(props) {
            var valgtChat = ref([]);
            var valgtChatDetails = ref(null);
            var user = firebaseApp.auth().currentUser;
            var user2 = ref("");
            user2.value = user;
            var db = firebaseApp.firestore();
            var chatsRef = db.collection("chats");
            var usersRef = db.collection("users");
            var profilBilder = {};
            var obj = {}
            var allSaved = ref({});
            var now = new Date();
            var valgtChatMeldingsIDer = {};
            var userIDs = [];
            var alleManChatterMed = [];
            var router = useRouter();
            var alleBrukereIChatten = {};
            var allebrukereManChatterMed = ref({});
            var sorterteChatter = ref([]);
            var update = ref(false);

            //Fjerner chatten
            async function fjernChat(id){
                delete allSaved.value[id];
                try{
                    if(allSaved.value[0] != null){
                        await hentChat(allSaved.value[0].chatID, allSaved.value[0]);
                    }
                    else{
                        valgtChat.value = [];
                        valgtChatDetails.value = null;
                    }
                }
                catch{ };
            }

            //Chat queryListener som lytter til nye meldinger og chatter
            async function initialiserChatListener(){
                var query2 = db.collection('chats').where(`deltakere.${user.uid}`, "==", true);
                
                //Chat listener
                query2.onSnapshot(async querySnapshot => {
                    var obj = {}

                    console.log("HELLO");

                    //Getting all data from docs into obj-objekt
                    for (let i = 0; i < querySnapshot.docs.length; i++) {
                        var document = querySnapshot.docs[i];
                        obj[document.id] = document.data();
                    }

                    //Looping over the keys in obj assigning it to allSaved
                    var keys = Object.keys(obj);
                    for(let i = 0; i < keys.length; i++){
                        var id = keys[i];
                        if(id in allSaved.value == false){
                            console.log("Denne feilen betyr at en id i querySnapshot finnes ikke i allSaved");
                            console.log(id)
                            await getInfo();
                            console.log(allSaved.value[id]);
                            console.log(sorterteChatter);
                            await hentChat(id, allSaved.value[id]);
                        }
                        else{
                            if(allSaved.value[id].lastMessage) allSaved.value[id].lastMessage = obj[id].lastMessage;
                            if(allSaved.value[id].lastSentMessage) allSaved.value[id].lastSentMessage = obj[id].lastSentMessage;
                        }
                    }

                    //Hver gang det ankommer en ny melding så appender vi den til den allerede valgte chatten gitt at de har samme ID.
                    try{
                        var valgtChatID = valgtChatDetails.value.chatID;
                        var m = {
                            "content": obj[valgtChatID].lastMessage,
                            "uid": obj[valgtChatID].lastMessageUser,
                            "id": obj[valgtChatID].lastMessageID,
                            "sentAt": firebase.firestore.Timestamp.fromDate(new Date()),
                            "belongsToChatID": obj[valgtChatID].lastMessageChatID,
                        }
                        
                        // await db.collection("chats").doc(valgtChatID).update({
                        //     [user.uid]: m["sentAt"],
                        // })

                        //Her sjekker vi at valgtChatID er lik den siste meldingen lagt til den valgte chatten7
                        //Hvis den siste meldingen har samme id som den siste meldingen allerede i chatten så legger vi den ikke til
                        //Hvis de er forskjellige så er det en ny melding.
                        if(valgtChatDetails.value.chatID == m.belongsToChatID){
                            if(!valgtChatMeldingsIDer[m.id]){
                                valgtChat.value.push(m);
                                allSaved.value[valgtChatID][user.uid] = m["sentAt"];

                                valgtChatMeldingsIDer[m.id] = true;
                                if(valgtChatDetails.value.chatID == m["belongsToChatID"]){
                                    if(m.uid != user.uid){
                                        var audio = new Audio(sound);
                                        audio.play();
                                    }
                                }
                                else{
                                    var audio = new Audio(sound);
                                    audio.play();
                                }
                            }
                        }
                    }
                    catch{ }
                        
                }, err => {
                    console.log(`Encountered error: ${err}`);
                });

            }

            // //Henter brukere hver 30sek
            setInterval(async function(){
                //Henter brukere
                await hentBrukere(alleBrukereIChatten);                
            }, 30000)

            //Hent all ChatInfo for en gitt bruker
            async function getInfo() {
                var chats = await chatsRef.where(`deltakere.${user.uid}`, "==", true).get();
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
                    } 
                    else {
                        mottakerProfilBilde = "https://firebasestorage.googleapis.com/v0/b/nevet-9e3ed.appspot.com/o/" + chatInnhold.mottaker + "_400x400" + ".webp" + "?alt=media&token=" + new Date().getTime(),
                        starterProfilBilde = "https://firebasestorage.googleapis.com/v0/b/nevet-9e3ed.appspot.com/o/" + chatInnhold.starter + "_400x400" + ".webp" + "?alt=media&token=" + new Date().getTime(),
                        profilBilder[mottaker] = mottakerProfilBilde;
                        profilBilder[starter] = starterProfilBilde;
                    }
                    chatsData[chats.docs[i].id] = chatInnhold;
                    chatsData[chats.docs[i].id]["mottakerProfilBilde"] = profilBilder[mottaker] + "1";
                    chatsData[chats.docs[i].id]["starterProfilBilde"] = profilBilder[starter] + "1";
                    chatsData[chats.docs[i].id]["thisUser"] = user.uid;
                    chatsData[chats.docs[i].id]["chatID"] = chats.docs[i].id;
                    chatsData[chats.docs[i].id]["lastOnPage"] = "2";
                    
                    //Hvis mottaker == den påloggede brukeren, legg også brukeren selv inn i gruppen
                    if(mottaker == user.uid) alleManChatterMed.push(starter);
                    else alleManChatterMed.push(mottaker);
                    
                    //Oversikt over alle brukere man chatter med7
                    var bruker = (user.uid == mottaker ? starter : mottaker);
                    alleBrukereIChatten[bruker] = true;
                }

                //Vi henter alle brukere som brukeren chatter med 
                await hentBrukere(alleBrukereIChatten);                

                //Hent id-en til alle samtalene til den gitte brukeren 
                var keys = Object.keys(chatsData);

                //Hent innholdet i alle chat-id-ene
                for (let i = 0; i < keys.length; i++) {
                    var innhold = await chatsRef.doc(keys[i]).collection("meldinger").get();
                    try {
                        chatsData[keys[i]]["meldinger"] = (chatsData[keys[i]]["meldinger"] || []).concat(innhold.docs[0].data());
                    } 
                    catch {};
                }
                allSaved.value = chatsData;
                console.log(allSaved.value);
            }
            
            //Denne henter alle brukere til en gitt bruker
            async function hentBrukere(obj){
                obj[user.uid] = true;
                console.log(obj);
                
                Object.keys(obj).forEach(async function(e){
                    var data = await usersRef.doc(e).get();
                    allebrukereManChatterMed.value[e] = data.data();
                })

                console.log(allebrukereManChatterMed.value);
            }

            //Første gang man åpner siden så skjer denne
            async function startUp() {
                //Først henter vi all info
                await getInfo();

                //Ble vi redirecta eller ikke
                var chatID = router.currentRoute.value.query.chatID ? router.currentRoute.value.query.chatID : false;
                var id = null;
                var val = null;

                //Hvis ja, hent korrekt
                if(chatID){
                    id = chatID;
                    val = allSaved.value[chatID];
                    await hentChat(id, val);
                }
                //Hvis nei, ikke redirect, hent første
                else{
                    var entries = Object.entries(allSaved.value);
                    if(entries.length == 0){
                        alert("Ingenting i allSaved");
                    }
                    else{
                        var firstEntry = Object.entries(allSaved.value).sort((a, b) => b.lastSentMessage - a.lastSentMessage)[0];
                        id = firstEntry[0];
                        val = firstEntry[1];
                        await hentChat(id, val);
                    }
                }

                //Start chatlistener etter initial GetInfo
                await initialiserChatListener();
            }

            //Hent chat hvis man trykker på den
            async function hentChat(id, val) {
                valgtChat.value = [];
                var element = null;
                var innhold = await chatsRef.doc(id).collection("meldinger").orderBy("sentAt", "desc").limit(20).get();
                for (let j = 0; j < innhold.docs.length; j++) {
                    element = innhold.docs[j].data();
                    valgtChatMeldingsIDer[innhold.docs[j].id] = true;
                    valgtChat.value.push(element);
                }
                valgtChat.value.reverse();
                valgtChatDetails.value = val;

                //Oppdaterer visningspunkt
                var datoNow = firebase.firestore.Timestamp.fromDate(new Date());
                console.log(datoNow);
                //Oppdater chatten og active
                try{
                    await chatsRef.doc(id).update({
                        [user.uid]: val.lastSentMessage
                    });
                    allSaved.value[id][user.uid] = val.lastSentMessage;
                }
                catch{

                }

                allebrukereManChatterMed.value[user.uid].active = datoNow;
                console.log(allSaved)

                router.push({ name: 'Dashboard', query: { side: 'meldinger', chat:id } })
            }
            
            //Start chatten
            startUp();

        return {
            MeldingKomponent,
            hentChat,
            ChatForDashboard,
            valgtChat,
            valgtChatDetails,
            user,
            valgtChatMeldingsIDer,
            allebrukereManChatterMed,
            fjernChat,
            spinner,
            sorterteChatter,
            allSaved,
            update,
            now,
            user2,
        }
    }
}
</script>