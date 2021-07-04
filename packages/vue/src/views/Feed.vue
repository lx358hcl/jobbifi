<template>
  <div :key="true" class="px-0 row center mobilFeed">
    <div class="col-md-6 col-xs-12 col-md-offset-3">
      <div class="panel">
        <div class="panel-body mt-5">
          <h2 class = "pl-4 ml-1">Feed (de siste 24 timene)</h2>
          <hr class = "cleanBeholder">
          <ul class="list-group list-group-dividered list-group-full mb-5">
            <spinner v-if="loading" class = "m-auto"></spinner>
            <li v-for="(value, key) in feedObjekt" class="list-group-item">
              <div class="media d-flex align-items-center">
                <div class="media-left p-2">
                  <router-link :to="'/bruker/' + value.user.brukernavn" class="avatar avatar-online">
                    <img class = "loadingImageSpinner" :src="value.user.profilbilde" style = "min-width: 40px; width:40px; min-height:40px; height:40px;" :alt="'Profilbilde til ' + value.user.brukernavn">
                  </router-link>
                </div>
                <div class="media-body p-2">
                  <small class="text-muted pull-right">{{ timeAgo.format(new Date(value.timestamp)) }}</small>
                  <router-link :to="'/bruker/' + value.user.brukernavn">
                    <p class="media-heading mb-0">{{ value.user.brukernavn }}</p>
                  </router-link>
                  <div>Har joinet Jobbifi-squaden 💪</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  //Import stuff
  import { ref, reactive } from "vue";
  import firebaseApp from "../../../firebase/firebaseconfig.js";
  import firestore from 'firebase/firestore';
  import router from '../router/index.js';
  import spinner from "../components/spinner.vue";
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

  //Variabler
  var feedObjekt = ref({});
  var loading = ref(true);
  var db = firebaseApp.firestore();

  //Feedgetter
  async function getFeed() {
    //Resetter feed-objektet og loading-variabelen
    loading.value = true;
    feedObjekt.value = {};

    //Henter vi hele userfeeden
    var dbInfo = await db.collection("feed").doc("registrationFeed").collection("allRegistrations").get();

    //Ting vi trenger
    var feedEntry = null;

    //Vi lager feedEntriene først med bare feeden
    dbInfo.forEach(e => {
      feedEntry = e.data();
      if(feedEntry.uid){
        feedObjekt.value[feedEntry.uid] = {
          type: feedEntry.type,
          timestamp: feedEntry.timestamp,
          user: null
        }
      }
    });

    //Vi oppdaterer feed-objektet med user-info, keys = uids
    Object.keys(feedObjekt.value).forEach(uid => {
      db.collection("users").doc(uid).get().then(doc => {
        feedObjekt.value[uid].user = doc.data();
      })
    })
    console.log(feedObjekt.value);
    
    //Slå av loaderen
    loading.value = false;
  }
  
  //Export shit
  export default {
    setup() {
      getFeed();
      return {
        feedObjekt,
        spinner,
        loading,
        timeAgo,
      }
    }
  }
</script>