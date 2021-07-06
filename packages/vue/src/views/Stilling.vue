<template>
  <main class="container center d-flex align-items-center p-0">
    <div v-if="stilling2" class="row beholder center pt-0">
      <div class="container mt-4 mb-5 px-0">
        <div class="row" style="border-top-right-radius: 20px;border-top-left-radius: 20px;">
          <div class="col-12" style="padding: 0px;border-top-left-radius: 20px;border-top-right-radius: 20px;">
            <div v-bind:style="{ backgroundImage: 'url(' + stilling2.companyImage + ')' }" style="background-color: transparent; background-size: cover; background-position:center; background-repeat: no-repeat; height: 250px;border-top-left-radius: 20px;border-top-right-radius: 20px;"></div>
          </div>
        </div>
        <div class="row row-cols-sm-1 row-cols-md-1 row-cols-lg-1 row-cols-xl-1">
          <div class="col" style="padding: 10px;">
            <div>
              <h5 class="d-inline-block" style="font-family: 'Public Sans', sans-serif;font-weight: bold;margin: 0px;">{{ stilling2.title }}</h5>
            </div>
            <div class="justify-content-md-end align-items-md-center justify-content-xl-start">
              <div class="row" style="margin-top: 15px;margin-bottom: 0px;">
                <div class="col-7">
                  <p class = "small d-inline-block" style="font-weight: bold;font-family: 'Public Sans', sans-serif;color: #2980ef;margin-top: 0px;margin-bottom: 0px;padding-top: 0px;padding-bottom: 0px;padding-right: 10px;">{{ stilling2.companyName }}</p>
                  <p class = "small d-inline-block text-left p-0" style="margin-bottom: 0px;padding: 0px;color: rgb(139,139,139);font-family: 'Public Sans', sans-serif;padding-left: 10px;">{{ stilling2.sted }}</p>
                </div>
                <div class="col-5 d-flex justify-content-end">
                  <p class = "small d-inline-block" style="margin-bottom: 0px;padding: 0px;color: rgb(139,139,139);font-family: 'Public Sans', sans-serif;padding-left: 10px;">Publisert {{ timeAgo.format(new Date()) }}</p>  
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col" style="padding: 0px;">
            <div class="list-group list-group-horizontal">
              <a class="text-center small col-4 list-group-item list-group-item-action pr-0 pt-0">
                <p style="color: #313437;margin-bottom: 6px;font-weight: bold;">Frist</p><span style="color: var(--gray-dark);">{{ timeAgo.format(new Date(parseInt(stilling2.americanDate))) }} </span>
              </a>
              <a class="text-center small col-4 list-group-item list-group-item-action pr-0 pl-0 pt-0">
                <p style="color: #313437;font-weight: bold;margin-bottom: 6px;">Type stilling</p><span>Fulltid</span>
              </a>
              <a class="text-center small col-4 list-group-item list-group-item-action pl-0 pt-0">
                <p class="d-block" style="color: var(--gray-dark);font-weight: bold; margin-bottom: 6px;">Firma rangering</p>
                <i class="fa fa-star d-inline"></i>
                <i class="fa fa-star d-inline"></i>
                <i class="fa fa-star d-inline"></i>
                <i class="fa fa-star d-inline"></i>
                <i class="fa fa-star-o d-inline"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="row">
          <div style = "word-wrap: break-word; white-space: pre-wrap; word-break: break-word;" class="col mt-4" v-html="stilling2.about ? stilling2.about : stilling2.teaser">
          </div>
        </div>
      </div>
    </div>
    <spinner v-else></spinner>
  </main>
</template>
    

<script>
  import firebaseApp from "../../../firebase/firebaseconfig.js";
  import more from "../components/moreTest.vue";
  import { useRouter, useRoute } from 'vue-router';
  import { ref, onMounted } from "vue";
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
  
  //Legg localen til timeago
  TimeAgo.addLocale(norsk)
  //Lag en timeago instans
  const timeAgo = new TimeAgo("nb");
  export default {
    setup() {
      const route = useRoute();
      const router = useRouter();
      var stilling2 = ref(null);
      console.log(route);
      async function getInfo() {
        console.log(route.params);
        var db = await firebaseApp.firestore();
        var result = await db.collection("jobs").doc(route.params.id).get();
        stilling2.value = result.data();
        console.log(stilling2);
      }

      function back(){
        router.go(-1);
      }
      getInfo();
      return {
        stilling2,
        timeAgo,
        more,
        spinner,
        back,
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600');
  .card {
    position: relative;
    display: flex;
    justify-content: center;
    cursor: pointer;
    width: 99%;
    padding: 2em 0;
    background: #fff;
    box-shadow: 0 0 6px 0 rgba(32, 32, 36, .12);
    transition: all 0.35s ease;
  }
  .card::before,
  .card::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: #000;
    height: 4px;
  }
  .card::before {
    width: 100%;
    opacity: 0;
    transition: opacity 0 ease, width 0 ease;
    transition-delay: 0.5s;
  }
  .card .content {
    max-width: 80%;
  }
  .card h6 {
    color: #999;
    font-weight: 600;
    text-transform: uppercase;
    margin: 0;
    letter-spacing: 2px;
  }
  .card:hover {
    box-shadow: 0 10px 20px 0 rgba(32, 32, 36, .12);
  }
  .card:hover::before {
    width: 100%;
    opacity: 1;
    transition: opacity 0.5s ease, width 0.5s ease;
    transition-delay: 0;
  }
  .card:hover .logo {
    margin-bottom: 0.5em;
  }
</style>