<template>
<section>
    <div class="container">
        <div class="row d-flex justify-content-center">
            <h3 class = "m-0 p-0">Kommentarer</h3>
        </div>
    </div>
    <hr>
    <div class="container mt-1 d-flex justify-content-center">
        <div class="row d-flex justify-content-center align-items-center">
        <p class = "text-center w-100" v-if="!user">Du må være logget inn for å kunne kommentere</p>
        <br>
        <img v-if="user" class="mr-2" style = "text-indent: -10000px; width:45px; height:45px; border-radius:30px;" :src="profilbilde1" onerror="this.onerror=null;this.src='1.png';">
        <div v-if="user" class="d-flex flex-row add-comment-section p-2 mb-0">
            <textarea v-model="kommentarTekst" type="text" class="form-control mr-3" placeholder="Kommenter noe">
            </textarea>
        </div>
        <form class = "reset-form" v-on:submit.prevent="kommenter">
            <button v-if="user" @click="kommenter" class="btn btn-primary" style = "background-color:#0079d3" type="button">
                <spinner v-if="loading"></spinner>
                <span v-else>Kommenter</span>
            </button>
        </form>
        <hr>
        <div class = "col-12">
            <paginatorFin class = "col-12 w-100"></paginatorFin>
            <div class = "d-flex justify-content-center">
                <div v-if="kommentarerLoading == ''" class="col-9">
                    <div class="mt-0 pt-0">
                        <ul class="p-0 justify-content-center">
                            <li v-for = "val in kommentarerArray" class="media my-4 d-flex align-items-center">
                                <span class="round">
                                    <img style = "text-indent: -10000px; width:35px; height:35px; border-radius:30px;" :src="val.profilbilde" onerror="this.onerror=null;this.src='./1.png" class="loadingImageSpinner align-self-start mr-3"></span>
                                <div class="media-body">
                                    <div class="row d-flex">
                                        <router-link :to = "'/bruker/' + val.brukernavn">
                                            <h6 class="user">  {{ val.brukernavn }} </h6>
                                        </router-link>
                                        <div class="ml-auto">
                                            <p class="text">{{ timeAgo.format(new Date(val.timestamp)) }}</p>
                                        </div>
                                    </div>
                                    <p class="text">{{ val.innhold }}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <spinner v-else></spinner>
            </div>
        </div>
        
        </div>
    </div>
</section>
</template>

<script>
    //Importer greier som trengs
    import { ref } from "vue";
    import firebaseApp from "../../../firebase/firebaseconfig.js";
    import firestore from 'firebase/firestore';
	import router from '../router/index.js';
    import spinner from "./spinner.vue";
    import TimeAgo from 'javascript-time-ago'
    import { settings } from "../settings.js";
    import paginator from "./paginator.vue";
    import paginatorFin from "./paginatorFin.vue";

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
    var timeAgo = new TimeAgo("nb");
    var kommentarTekst = ref("");
    var db = firebaseApp.firestore();
    var kommentarer = ref({});
    var kommentarerArray = ref([]);
    var user = ref("");
    var loading = ref(false);
    var kommentarerLoading = ref(true);
    var user = ref("");
    
    async function kommenter() {
        //Start loader
        loading.value = true;

        //Resten
        var brukerSomVilKommentere = await firebaseApp.auth().currentUser;
        var brukere = await db.collection("users").where("brukernavn", "==", router.currentRoute.value.params.brukernavn).get();
        var brukerSomSkalKommenteresPå = brukere.docs[0].data();
        var alleBrukere = await db.collection("users");

        var kommentar = {
            brukernavn: "lukasinos",
            innhold: "hello",
            timestamp: new Date().getTime(),
            uid: brukerSomVilKommentere.uid,
        }
        
        //Vi lagrer kommentaren på den riktige plassen
        await db.collection("comments").doc(brukerSomSkalKommenteresPå.uid).collection("alleKommentarer").doc().set(kommentar);

        //Legg til kommentarerArray
        var bruker = await alleBrukere.doc(kommentar.uid).get();
        kommentar.profilbilde = bruker.data().profilbilde;
        kommentarerArray.value.unshift(kommentar);

        //Avslutt loadingspinner
        loading.value = false;
    }

    //Get all the comments for the given user
    async function getCommentsOnUser(){
        //Start loading spinner
        kommentarerLoading.value = true;

        //Reset kommentarer
        kommentarer.value = [];
        kommentarerArray.value = [];

        var users = await db.collection("users").where("brukernavn", "==", router.currentRoute.value.params.brukernavn).get();
        var theUserThatHasCommentsID = users.docs[0].data().uid;
        var dbComments = await db.collection("comments").doc(theUserThatHasCommentsID).collection("alleKommentarer").orderBy('timestamp').get();
        var alleBrukere = await db.collection("users");

        //Vi looper over alle kommentarene og 
        await dbComments.forEach((doc) => kommentarer.value[doc.id] = doc.data());

        //Looper over kommentarverdiene
        for (const [key, val] of Object.entries(kommentarer.value)) {
            //Grab the user on the comment
            var data = await alleBrukere.doc(val.uid).get();

            //We append to the kommentarer objekt
            try{
                kommentarer.value[key].profilbilde = data.data().profilbilde;
            } catch {};
            try{
                kommentarer.value[key].brukernavn = data.data().brukernavn;
            } catch {};
        }

        //Konverterer objekt til array før vi sender det som prop
        Object.values(kommentarer.value).forEach(e => {
            kommentarerArray.value.unshift(e);
        })

        //Avslutt loading spinner
        kommentarerLoading.value = false;

    }

    export default {
        props: {
            profilbilde: String
        },
        setup() {
            user.value = firebaseApp.auth().currentUser;
            getCommentsOnUser();
            return {
                kommenter,
                kommentarTekst,
                timeAgo,
                spinner,
                kommentarerArray,
                user,
                loading,
                kommentarerLoading,
                paginator,
                paginatorFin,
            }
        }
    }
</script>