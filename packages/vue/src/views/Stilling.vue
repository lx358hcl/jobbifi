<template>
  <main class="container center d-flex align-items-center p-0">
    <div v-if="stilling2" class="row beholder center pt-0">
      <div class="container mt-4 mb-5 px-3">
        <div class = "row">
          <div class = "col-12 mb-3 mx-0 px-0 d-flex justify-content-start align-items-center">
            <button style = "color: #2b2fc5; font-weight: 900;" @click = "back" type="button" class="btn btn-link">
              <i class="fas fa-angle-left"></i> Tilbake
            </button>          
          </div>
        
        </div>
        <div class="row" style="border-top-right-radius: 20px;border-top-left-radius: 20px;">
          <div class="col-12" style="padding: 0px;border-top-left-radius: 20px;border-top-right-radius: 20px;">
            <div class = "d-flex justify-content-center" v-bind:style="{ backgroundImage: 'url(' + stilling2.companyImage + ')' }" style="background-color: transparent; background-size: contain; background-position:center; background-repeat: no-repeat; height: 250px;border-top-left-radius: 20px;border-top-right-radius: 20px;">
              <img style = "background-color:#f8f9fa;" width = "90" height = "90" class = "stillingsLogo" :src = "bilde">
            </div>
          </div>
        </div>
        <div class="row row-cols-sm-1 row-cols-md-1 row-cols-lg-1 row-cols-xl-1">
          <div class="col-12 pt-4 px-0">
            <div class = "row mt-4">
              <div class = "col-12 col-lg-6 my-3 d-flex align-items-center">
                <h4 class="d-inline-block" style="font-family: 'Lato', sans-serif;font-weight: bold;margin: 0px;">{{ stilling2.title }}</h4>
              </div>
              <div class = "col-12 col-lg-6 my-3 d-flex justify-content-end">
                <moreTest v-if = "stilling2" :stilling = "stilling2" class = "float-left"></moreTest>
              </div>
            </div>
            <div class="row justify-content-md-end align-items-md-center justify-content-xl-start">
              <div class="col-12" style="margin-top: 0px;margin-bottom: 0px;">
                <div class = "row">

                  <div class="col-7 py-2 ml-3 pl-0 mt-2 d-flex align-items-center">
                    <router-link :to = "'/selskap/' + stilling2.companyName">
                      <p class = "mt-0 py-0 d-inline-block" style="font-weight: bold;font-family: 'Lato', sans-serif; color: #2b2fc5; margin-top: 0px;margin-bottom: 0px;padding-top: 0px;padding-bottom: 0px;padding-right: 10px;">{{ stilling2.companyName }}</p>
                    </router-link>
                    <p class = "font-weight-bold d-inline-block text-left p-0" style="margin-bottom: 0px;padding: 0px; color: rgb(139,139,139); font-family: 'Lato', sans-serif;padding-left: 10px;">-&nbsp;&nbsp;{{ stilling2.sted }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col" style="padding: 0px;">
            <div class="list-group list-group-horizontal">
              <a class="col-4 p-2 border-0 list-group-item list-group-item-action noHover pr-0 pl-0">
                <p style="color: #313437;margin-bottom: 6px;font-weight: bold;">Frist
                </p>
                  <span style="color: var(--gray-dark);">{{ timeAgo.format(new Date(parseInt(stilling2.americanDate))) }}
                  </span>
              </a>
              <a class="col-4 p-2 border-0 list-group-item list-group-item-action noHover pr-0 pl-0">
                <p style="color: #313437;font-weight: bold;margin-bottom: 6px;">Type stilling</p><span>Fulltid</span>
              </a>
              <a class="col-4 p-2 border-0 list-group-item list-group-item-action noHover pl-0">
                <p class="d-block" style="color: var(--gray-dark);font-weight: bold; margin-bottom: 6px;">Opprinnelse</p>
                <p style = "text-transform: capitalize;" >{{ stilling2.opprinnelse }} </p>
              </a>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col mt-2 px-0 d-flex align-items-start flex-column justify-content-start text-left" style = "font-family: Inter !important; font-size:14px;"  v-html="stilling2.about ? stilling2.about : stilling2.teaser">
          </div>
        </div>
      </div>
    </div>
    <spinner v-else></spinner>
  </main>
</template>
    

<script>
  import firebaseApp from "../../../firebase/firebaseconfig.js";
  import moreTest from "../components/moreTest.vue";
  import { useRouter, useRoute } from 'vue-router';
  import { ref, onMounted, onUpdated } from "vue";
  import TimeAgo from 'javascript-time-ago'
  import spinner from "../components/spinner.vue";
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

  var dato = ref("");
  var bilde = ref("");
  
  //Legg localen til timeago
  TimeAgo.addLocale(norsk)
  //Lag en timeago instans
  const timeAgo = new TimeAgo("nb");
  export default {
    setup() {
      onMounted(() => {
        window.scrollTo(0, 0);
      })
      onUpdated(() => {
        window.scrollTo(0, 0);
      })
      const route = useRoute();
      const router = useRouter();
      var stilling2 = ref(null);
      var user = firebaseApp.auth().currentUser;
      

      async function getInfo() {
        
        var db = await firebaseApp.firestore();
        var result = await db.collection("jobs").doc(router.currentRoute.value.params.id).get();
        stilling2.value = result.data();
        stilling2.value["id"] = router.currentRoute.value.params.id;
        
        
        bilde.value = `https://www.google.com/s2/favicons?sz=256&domain_url=${new URL(stilling2.value.url).hostname}`;
      }

      function back(){
        router.go(-1);
      }

      getInfo();
      return {
        stilling2,
        timeAgo,
        moreTest,
        spinner,
        back,
        bilde,
        user,
      }
    }
  }
</script>