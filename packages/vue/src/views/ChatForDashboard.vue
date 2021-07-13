<template>
  <div v-if = "details" class="p-0 m-0 h-100">
    <div class="row w-100 m-0 p-0">
      <div class="col-12 px-3 py-0 m-0 border-bottom p-1">
        <div class="container px-3 py-2 m-0">
          <div class="row">
            <router-link :to = "'/bruker/' + (details.thisUser == details.mottaker ? details.starterBrukernavn : details.mottakerBrukernavn)">
              <div class="col-2 bilde animate__animated animate__fadeIn" style="border: 2px solid #d4d4d4;" v-bind:style="{ backgroundImage: 'url(' + (details.thisUser == details.mottaker ? details.starterProfilBilde : details.mottakerProfilBilde) + '), url(https://firebasestorage.googleapis.com/v0/b/nevet-9e3ed.appspot.com/o/1_200x200.webp?alt=media&token=fabbcb0f-f836-4e8f-984b-34be3af85b00)' }">
            
              </div>
            </router-link>
            <div :class="{'d-flex': !details.meldinger, 'align-items-center':!details.meldinger}" class="col-9 m-0 pl-3">
              <div class="row">
                <div class="col-12 text-left">
                  <router-link :to = "'/bruker/' + (details.thisUser == details.mottaker ? details.starterBrukernavn : details.mottakerBrukernavn)">
                    <p class="m-0 mb-1 name"> {{ (details.thisUser == details.mottaker ? details.starterBrukernavn : details.mottakerBrukernavn) }}</p>
                  </router-link>
                  <p class="m-0 small text-secondary" style="text-overflow: ellipsis !important;white-space: nowrap;overflow: hidden;">
                    Aktiv for 5 minutter siden
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row d-flex justify-content-start m-0 p-4">
      <div class = "col-12">
        <div class = "container-fluid pr-5 pl-3">
          <div class = "row">
            <div v-for="melding in chat"  class = "col-12">
              <span class="badge meldingsBoble float-left p-2 badge-pill badge-info font-weight-normal" :class = "{'float-right': melding.uid == details.thisUser, 'mottakerBoble': melding.uid != details.thisUser}" >
                {{ melding.content }}
              </span>
            </div>
          </div>        
        </div>      
      </div>
    </div>

    <div class="row d-flex bottom justify-content-start m-0 w-100 py-2 px-0" style = "position:absolute; bottom:0; font-family: Lato;">
      <div style = "background-color:#f7f7f7; border: 1px solid #dfdfdf;" class = "w-100 mx-3 my-2 rounded">
        <form @submit.prevent="sendMelding()" class="form-inline w-100 m-0 p-0 col-12 d-flex align-items-center flex-row">
          <div class="form-group col-10 p-0 m-0">
            <label for="meldingTekst" class="sr-only">Send</label>
            <input v-model = "meldingsTekst" style = "background-color:#f7f7f7;" type="text" class="mx-1 form-control w-100 p-4 border-0" id="meldingTekst" placeholder="Skriv en melding her...">
          </div>
          <button type="submit" class="btn btn-light m-0 col-2 font-weight-bold"><i class="fas fa-paper-plane"></i> Send</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import { ref } from "vue";
  import firebaseApp from "../../../firebase/firebaseconfig.js";
  import firestore from 'firebase/firestore';
  import firebase from 'firebase';
  import spinner from '../components/spinner.vue';
  import { useRouter, useRoute } from 'vue-router'

  var meldingsTekst = ref("");
  var db = firebaseApp.firestore();
  var chatsRef = db.collection("chats");
  var usersRef = db.collection("users");

  export default {
    props: {
      chat: Array,
      details: Object,
    },
    setup(props, context) {
      var user = firebaseApp.auth().currentUser;
      async function sendMelding(){
        var str = meldingsTekst.value;
        await chatsRef.doc(props.details.chatID).collection("meldinger").doc().set({
          "content": str,
          "sentAt": firebase.firestore.FieldValue.serverTimestamp(),
          "uid": user.uid,
          "brukernavn": props.details.thisUser == props.details.mottaker ?  props.details.mottakerBrukernavn :  props.details.starterBrukernavn,
        });
        await chatsRef.doc(props.details.chatID).update({
          "lastSentMessage": firebase.firestore.FieldValue.serverTimestamp(),
          "lastMessage": str,
        })
      }

      return {
        sendMelding,
        meldingsTekst,
      }
    }
  }
</script>