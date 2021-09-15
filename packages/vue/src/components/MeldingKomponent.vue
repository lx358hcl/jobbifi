<template>
  <div class="container px-3 py-2 m-0">
    <div class="row">
      <div class="col-2 bilde animate__animated animate__fadeIn" style="border: 2px solid #d4d4d4;" v-bind:style="{ backgroundImage: 'url(' + (melding.thisUser == melding.mottaker ? melding.starterProfilBilde : melding.mottakerProfilBilde) + '), url(https://firebasestorage.googleapis.com/v0/b/nevet-9e3ed.appspot.com/o/1_400x400.webp?alt=media&token=fabbcb0f-f836-4e8f-984b-34be3af85b00)' }">
        <span style = "position:relative; top:25px; left:10px; margin-left:0px; margin-top:0px; border:3px solid white; width:20px !important; height:20px;" :class = "{'badge-success': brukerSistAktivTid, 'badge-danger': !brukerSistAktivTid }" class="badge d-inline-block badge-pill">&nbsp;&nbsp;&nbsp;</span>  
      </div>
      <div :class="{'d-flex': !melding.meldinger, 'align-items-center':!melding.meldinger}" class="col-8">
        <div class="col-10 text-left p-0 m-0">
          <p class="m-0 mb-1 font-weight-normal" :class = "{'font-weight-bold':brukerSistInniChat.toDate() < melding.lastSentMessage.toDate()}"> {{ melding.lastSentMessage.toDate().getTime() }}</p>
                    <p class="m-0 mb-1 font-weight-normal" :class = "{'font-weight-bold':brukerSistInniChat.toDate() < melding.lastSentMessage.toDate()}"> {{ brukerSistInniChat.toDate().getTime() }}</p>

          <p class="m-0 small" style="text-overflow: ellipsis !important;white-space: nowrap;overflow: hidden;">
            {{ melding.lastMessage }}
            <i><span>{{ timeAgo.format(melding.lastSentMessage.toDate().getTime()) }}</span></i>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .bilde {
    border-radius: 30px;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 46px;
    min-width: 46px;
    max-width: 46px;
    height: 46px;
  }
  .name {
    color: #263254;
    font-weight:bold;
  }
  .time {
    color: #a7a7a7;
  }
</style>

<script>
  import { ref, onUpdated } from "vue";
  import firebase from 'firebase';
  import TimeAgo from 'javascript-time-ago'
 
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
  TimeAgo.addLocale(norsk)
  const timeAgo = new TimeAgo("nb");

  export default {
    props: {
      id: Object,
      melding: Object,
      bruker: Object,
      valgtChat: Object,
      now: Date,
      user: Object,
      allebrukereManChatterMed: Object,
    },
    computed:{
      brukerSistAktivTid:function(){
        var now = new Date();
        var brukerSistAktivTid = this.allebrukereManChatterMed[this.mottaker].active.toDate();
        var diff = now - brukerSistAktivTid;

        if(diff < 40000) return true;
        else return false;
      },
      brukerSistInniChat: function(){
        return this.melding[this.user.uid]
      }
    },
    setup(props) {
      var mottaker = ref("");
      var mottakerBrukernavn = ref("");
      var activeUser = ref(false); 
      mottaker.value = props.melding.thisUser == props.melding.starter ? props.melding.mottaker : props.melding.starter;
      mottakerBrukernavn = props.melding.thisUser == props.melding.starter ? props.melding.mottakerBrukernavn : props.melding.starterBrukernavn;

      return {
        mottaker,
        timeAgo,
        firebase,
        mottakerBrukernavn,
        activeUser,
      }
    }
  }
</script>