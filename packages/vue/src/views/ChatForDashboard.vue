<template>
  <div class="p-0 m-0 h-100">
    <div class="row w-100 m-0 p-0">
      <div class="col-12 px-3 py-0 m-0 border-bottom p-1">
        <div class="container-fluid px-3 py-2 m-0">
          <div class="row">
            <router-link :to = "'/bruker/' + (details.thisUser == details.mottaker ? details.starterBrukernavn : details.mottakerBrukernavn)">
              <div class="col-2 bilde " style="border: 2px solid #d4d4d4;" v-bind:style="{ backgroundImage: 'url(' + (details.thisUser == details.mottaker ? details.starterProfilBilde : details.mottakerProfilBilde) + '), url(https://firebasestorage.googleapis.com/v0/b/nevet-9e3ed.appspot.com/o/1_400x400.webp?alt=media&token=fabbcb0f-f836-4e8f-984b-34be3af85b00)' }">
                <span style = "position:relative; top:25px; left:10px; margin-left:0px; margin-top:0px; border:3px solid white; width:20px !important; height:20px;" :class = "{'badge-success': brukerSistAktivTid, 'badge-danger': !brukerSistAktivTid }" class="badge d-inline-block badge-pill">&nbsp;&nbsp;&nbsp;</span>
              </div>
            </router-link>
            <div :class="{'d-flex': !details.meldinger, 'align-items-center':!details.meldinger}" class="col-11 m-0 pl-3 w-100">
              <div class="row h-100 w-100">
                <div class="col-11 text-left">
                  <router-link :to = "'/bruker/' + (details.thisUser == details.mottaker ? details.starterBrukernavn : details.mottakerBrukernavn)">
                    <p class="m-0 mb-0 name d-inline-block"> {{ (details.thisUser == details.mottaker ? details.starterBrukernavn : details.mottakerBrukernavn) }}</p>
                  </router-link>
                  <br>
                  <p class="m-0 small text-secondary d-inline-block" style="text-overflow: ellipsis !important;white-space: nowrap;overflow: hidden;">
                    Aktiv {{ timeAgo.format(allebrukereManChatterMed[mottaker].active.toDate()) }}
                    {{ brukerSistAktivTid }}
                  </p>
                </div>
                <div class = "col-1 d-flex align-items-center ">
                  <button @click = "deleteChat(details.chatID)" type="button" class="btn btn-light d-flex align-items-center justify-content-center">
                    <i class="fas fa-trash-alt m-0 p-0"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div ref = "meldingsContainerScroll" id = "lukaner" style = "max-height:70vh; min-height:70vh; height:70vh; overflow-y: scroll;" class="row d-flex justify-content-start m-0 p-4">
      <div class = "col-12">
        <div class = "container-fluid pr-5 pl-3">
          <div id = "meldingsContainer" class = "row">
            <div v-for="melding in chat" class = "col-12">
              <span style = "max-width:50% !important;" class=" badge wordWrap meldingsBoble melding p-2 badge-info text-left font-weight-normal" :key="melding" :class = "{'float-right': melding.uid == details.thisUser, 'mottakerBoble': melding.uid != details.thisUser}" >
                {{ melding.content }}
              </span>
            </div>
          </div>        
        </div>      
      </div>
    </div>

    <div class="row d-flex bottom justify-content-start m-0 w-100 py-2 px-0" style = "position:absolute; bottom:0; font-family: Lato;">
      <div style = "background-color:#f7f7f7; border: 1px solid #dfdfdf;" class = "w-100 mx-3 my-2 rounded">
        <form autocomplete="off" @submit.prevent="sendMelding()" class="form-inline w-100 m-0 p-0 col-12 d-flex align-items-center flex-row">
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
  import { ref, watch } from "vue";
  import firebaseApp from "../../../firebase/firebaseconfig.js";
  import firestore from 'firebase/firestore';
  import firebase from 'firebase';
  import spinner from '../components/spinner.vue';
  import { useRouter, useRoute } from 'vue-router';
  import TimeAgo from 'javascript-time-ago'

  //Timeago localen for norsk
  var norsk = {
    "locale": "nb",
    "long": {
      "year": {
        "previous": "i fjor",
        "current": "i år",
        "next": "neste år",
        "past": "for {0} år siden",
        "future": "om {0} år"
      },
      "quarter": {
        "previous": "forrige kvartal",
        "current": "dette kvartalet",
        "next": "neste kvartal",
        "past": {
          "one": "for {0} kvartal siden",
          "other": "for {0} kvartaler siden"
        },
        "future": {
          "one": "om {0} kvartal",
          "other": "om {0} kvartaler"
        }
      },
      "month": {
        "previous": "forrige måned",
        "current": "denne måneden",
        "next": "neste måned",
        "past": {
          "one": "for {0} måned siden",
          "other": "for {0} måneder siden"
        },
        "future": {
          "one": "om {0} måned",
          "other": "om {0} måneder"
        }
      },
      "week": {
        "previous": "forrige uke",
        "current": "denne uken",
        "next": "neste uke",
        "past": {
          "one": "for {0} uke siden",
          "other": "for {0} uker siden"
        },
        "future": {
          "one": "om {0} uke",
          "other": "om {0} uker"
        }
      },
      "day": {
        "previous": "i går",
        "previous-2": "i forgårs",
        "current": "i dag",
        "next": "i morgen",
        "next-2": "i overmorgen",
        "past": "for {0} døgn siden",
        "future": "om {0} døgn"
      },
      "hour": {
        "current": "denne timen",
        "past": {
          "one": "for {0} time siden",
          "other": "for {0} timer siden"
        },
        "future": {
          "one": "om {0} time",
          "other": "om {0} timer"
        }
      },
      "minute": {
        "current": "dette minuttet",
        "past": {
          "one": "for {0} minutt siden",
          "other": "for {0} minutter siden"
        },
        "future": {
          "one": "om {0} minutt",
          "other": "om {0} minutter"
        }
      },
      "second": {
        "current": "nå",
        "past": {
          "one": "for {0} sekund siden",
          "other": "for {0} sekunder siden"
        },
        "future": {
          "one": "om {0} sekund",
          "other": "om {0} sekunder"
        }
      }
    },
    "short": {
      "year": {
        "previous": "i fjor",
        "current": "i år",
        "next": "neste år",
        "past": "for {0} år siden",
        "future": "om {0} år"
      },
      "quarter": {
        "previous": "forrige kv.",
        "current": "dette kv.",
        "next": "neste kv.",
        "past": "for {0} kv. siden",
        "future": "om {0} kv."
      },
      "month": {
        "previous": "forrige md.",
        "current": "denne md.",
        "next": "neste md.",
        "past": "for {0} md. siden",
        "future": "om {0} md."
      },
      "week": {
        "previous": "forrige uke",
        "current": "denne uken",
        "next": "neste uke",
        "past": "for {0} u. siden",
        "future": "om {0} u."
      },
      "day": {
        "previous": "i går",
        "previous-2": "i forgårs",
        "current": "i dag",
        "next": "i morgen",
        "next-2": "i overmorgen",
        "past": "for {0} d. siden",
        "future": "om {0} d."
      },
      "hour": {
        "current": "denne timen",
        "past": "for {0} t siden",
        "future": "om {0} t"
      },
      "minute": {
        "current": "dette minuttet",
        "past": "for {0} min siden",
        "future": "om {0} min"
      },
      "second": {
        "current": "nå",
        "past": "for {0} sek siden",
        "future": "om {0} sek"
      }
    },
    "narrow": {
      "year": {
        "previous": "i fjor",
        "current": "i år",
        "next": "neste år",
        "past": "–{0} år",
        "future": "+{0} år"
      },
      "quarter": {
        "previous": "forrige kv.",
        "current": "dette kv.",
        "next": "neste kv.",
        "past": "–{0} kv.",
        "future": "+{0} kv."
      },
      "month": {
        "previous": "forrige md.",
        "current": "denne md.",
        "next": "neste md.",
        "past": "-{0} md.",
        "future": "+{0} md."
      },
      "week": {
        "previous": "forrige uke",
        "current": "denne uken",
        "next": "neste uke",
        "past": "-{0} u.",
        "future": "+{0} u."
      },
      "day": {
        "previous": "i går",
        "previous-2": "-2 d.",
        "current": "i dag",
        "next": "i morgen",
        "next-2": "+2 d.",
        "past": "-{0} d.",
        "future": "+{0} d."
      },
      "hour": {
        "current": "denne timen",
        "past": "-{0} t",
        "future": "+{0} t"
      },
      "minute": {
        "current": "dette minuttet",
        "past": "-{0} min",
        "future": "+{0} min"
      },
      "second": {
        "current": "nå",
        "past": "-{0} s",
        "future": "+{0} s"
      }
    }
  }
  //Legg localen til timeago
  TimeAgo.addLocale(norsk)
  //Lag en timeago instans
  const timeAgo = new TimeAgo("nb");

  var meldingsTekst = ref("");
  var db = firebaseApp.firestore();
  var chatsRef = db.collection("chats");
  var usersRef = db.collection("users");
  var meldingsContainerScroll = ref(null);
  
  function scrollToBottom(){
    setTimeout(function(){
      meldingsContainerScroll.value.scrollTop = 30000;
    }, 10)
  }

  export default {
    props: {
      chat: Array,
      details: Object,
      allebrukereManChatterMed: Object,
      now: Date,
    },
    computed:{
      brukerSistAktivTid:function(){
        var now = new Date();
        var brukerSistAktivTid = this.allebrukereManChatterMed[this.mottaker].active.toDate();
        var diff = now - brukerSistAktivTid;

        if(diff < 40000) return true;
        else return false;
      }
    },
    setup(props, context) {
      var user = firebaseApp.auth().currentUser;
      watch(props, scrollToBottom, { deep: true });
      scrollToBottom();

      async function deleteChat(id){
        await chatsRef.doc(id).update({
          [`deltakere.${user.uid}`]: false,
        })
        context.emit("fjernaChat", id);
      }

      var mottaker = ref("");
      var mottakerBrukernavn = ref("");
      var activeUser = ref(false); 
      mottaker.value = props.details.thisUser == props.details.starter ? props.details.mottaker : props.details.starter;

      // var brukerSistAktivTid = ref("");
      // brukerSistAktivTid.value = props.allebrukereManChatterMed[mottaker.value].active.toDate();
      // var diff = props.now - brukerSistAktivTid.value;

      // console.log(props.now);
      // console.log(brukerSistAktivTid.value);
      // console.log(diff);

      // if(diff < 40000) activeUser.value = true;
      // else activeUser.value = false;

      async function sendMelding(){
        var str = meldingsTekst.value;
        meldingsTekst.value = "";

        var dato = firebase.firestore.Timestamp.fromDate(new Date());
        
        var message = await chatsRef.doc(props.details.chatID).collection("meldinger").doc();
        message.set({
          "content": str,
          "sentAt": dato,
          "uid": user.uid,
        });
        var m = {
          "content": str,
          "sentAt": dato,
          "uid": user.uid,
        }

        props.chat.push(m);
        await db.collection("chats").doc(props.details.chatID).set({
          "deltakere":{
            [props.details.starter]: true,
            [props.details.mottaker]: true,
          }
        }, {merge: true});

        await chatsRef.doc(props.details.chatID).update({
          "lastSentMessage": dato,
          "lastMessage": str,
          "lastMessageID": message.id,
          "lastMessageUser": user.uid,
          "lastMessageChatID": props.details.chatID,
        })
        //Oppdaterer visningspunkt
        await chatsRef.doc(props.details.chatID).update({
          [user.uid]: dato,
        })

      }

      return {
        sendMelding,
        meldingsTekst,
        firebase,
        meldingsContainerScroll,
        timeAgo,
        user,
        activeUser,
        deleteChat,
        mottaker,
      }
    }
  }
</script>