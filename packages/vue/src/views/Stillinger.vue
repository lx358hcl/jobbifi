<template>
    <main class="d-flex justify-content-center align-items-center page contact-us-page" style="min-height: calc(100vh - 294px);">
        <section v-if="results" class="w-100 clean-block clean-form dark" style="padding-bottom: 0px;min-height: calc(100vh - 200px);background: rgb(255,255,255);padding-top: 40px;border-style: none;margin-left: 20px;margin-right: 20px;">
            <!-- Start: 1 Row 2 Columns -->
            <div class="container px-0" style="margin-bottom: 11px;">
                <div class="row m-0 p-0 row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 d-flex justify-content-center">
                    <!--FilterMeny-->
                    <filterWidget v-if="filterRes" @stedChanged="byttSted" @companyChangeOccurred="changeCompany" @filteringOccurred="changeFacet" @filtering="changeFacetTeknoCompany" :settings="settings.facetFilters" :facets="filterRes.facets"></filterWidget>
                    <div class="col-12 col-sm-11 col-md-8 col-lg-8 col-xl-9 animate__animated stillingsContainer">
                        <!--Info-->
                        <antallTreff class = "mt-3 pb-4" :treff = "results.nbHits" :kjøretid="results.processingTimeMS" :søket="settings.searchQuery"></antallTreff>
                        <sorteringsWidget @byttIndex="byttIndex" @endrAntall="byttAntall" class = "mb-3"></sorteringsWidget>
                        <filterBubbles v-bind:facets = "settings.facetFilters"></filterBubbles>
                        <søkeFelt class = "pt-3" :searchQuery="$router.currentRoute.value.query.søk" @searchOccurred="changeSearch"></søkeFelt>
                        <br>
                        <!--Stillingsseksjon-->
                        <div class = "d-flex justify-content-center flex-column container stillingsSeksjon">
                            <div class = "row d-flex justify-content-center">
                                <spinner class = "m-3" v-if="loading"></spinner>
                                <p class = "text-center w-100 p-3" v-if = "results && results.hits.length == 0">Fant ingen treff for det gitte søkekriteriet</p>
                                <stillingElement v-if="results" v-for = "stilling in results.hits" :user="user" :title="stilling.title" :id="stilling.id" :companyImage="stilling.companyImage" :companyName="stilling.companyName" :key="stilling.objectID" :teaser="stilling.teaser" :teknologier="stilling.teknologier" :stilling="stilling"></stillingElement>
                            </div>
                        </div>
                    </div>
                </div>  
            </div><!-- End: 1 Row 2 Columns -->
        </section>
        <spinner v-else></spinner>
    </main><!-- Start: Footer-1 -->
</template>

<script>
//Scroll bottom call search, inifitescroll
var stopMultiTrigger = false;

$(window).on("scroll", function() {
    $('#return-to-top').fadeIn(200); 
    if(window.location.pathname == "/stillinger"){
        var entireHeight = parseInt(document.querySelector("body").scrollHeight);
        var windowHeight = parseInt(window.innerHeight);
        var scrollPosition = parseInt(document.querySelector("body").scrollTop);
        if(stopMultiTrigger == false){
            if((entireHeight * 0.9) <= (scrollPosition + windowHeight)){
                stopMultiTrigger = true
                console.log("OK");
                paginateUp().then(e => {
                    stopMultiTrigger = false;
                })
            }
        }
    }
});

//Importer greier og instansier variabler
import algoliasearch from 'algoliasearch';
import pilNed from '../components/pilNed.vue';
import stillingElement from '../components/stillingElement.vue';
import paginator from '../components/paginator.vue';
import søkeFelt from '../components/søkeFelt.vue';
import spinner from '../components/spinner.vue';
import antallTreff from '../components/antallTreff.vue';
import filterWidget from '../components/filterWidget.vue';
import sorteringsWidget from '../components/sorteringsWidget.vue';
import filterBubbles from '../components/filterBubbles.vue';
import firebaseApp from "../../../firebase/firebaseconfig.js";

import { useRouter, useRoute } from "vue-router";
import { ref, watch } from "vue";
var searchClient = algoliasearch('0Z5J6B61BT','19bbc7841da63eff03e395ae8a54074c');

var søkeIndex = searchClient.initIndex("jobbifijobs");
var newestFirstIndex = searchClient.initIndex("JobsNewestFirst");
var fristFirstIndex = searchClient.initIndex("FristFirst");
var mostLikesFirst = searchClient.initIndex("mostLikesFirst");

var results = ref("");
var page = ref(0);
var totaltAntallSider = ref(0);
var loading = ref(false);
var user = ref("");

var indexes = {
    "søkeIndex": søkeIndex,
    "newestFirstindex": newestFirstIndex,
    "fristFirstIndex": fristFirstIndex,
    "mostLikesFirst": mostLikesFirst,
}

//Søkereffen
var settings = ref({
    indexType: "søkeIndex",
    hitsPerPage: 10,
    searchQuery: "",
    facetFilters: {
        opprinnelse: ["opprinnelse:ifijobs", "opprinnelse:finn", "opprinnelse:arbeidsplassen"],
        position: ["position:annet", "position:fulltid", "position:deltid"],
        teknologier: [],
        companyName: [],
        sted: [],
    }
});

//Filter for all resultatet
var filterRes = ref("");
søkeIndex.search("",{
    facets: ["*"],
}).then((response) => {
    filterRes.value = response;
    console.log(filterRes.value);
});

//Lytt til settings changes
watch(settings, search, { deep: true });

//Paginate up funksjon
async function paginateUp(){
    if(page.value > totaltAntallSider.value) {
        console.log("ikke noe mer å vise");
        return undefined;
    }
    page.value = page.value + 1;
    var res = await indexes[settings.value.indexType].search(settings.value.searchQuery, {
        facets: ["*"],
        facetFilters: [
            [...settings.value.facetFilters.opprinnelse], [...settings.value.facetFilters.position], [...settings.value.facetFilters.teknologier], [...settings.value.facetFilters.companyName], [...settings.value.facetFilters.sted]
        ],
        page: page.value,
        hitsPerPage: settings.value.hitsPerPage,
    });

    results.value.hits = ((results.value.hits) || []).concat(res.hits);
    totaltAntallSider.value = results.value.nbPages;
    console.log(results.value);
}

//Change search
function changeSearch(str){
    console.log("SØKER med: " + str);
    settings.value.searchQuery = str;
}

function changeFacet(facet){
    console.log(facet);
    console.log(settings);
    switch (facet) {
        case 'ifijobs':
            if(settings.value.facetFilters.opprinnelse.includes(("opprinnelse:" + facet))){
                settings.value.facetFilters.opprinnelse = settings.value.facetFilters.opprinnelse.filter(e => e != ("opprinnelse:" + facet));
            }
            else settings.value.facetFilters.opprinnelse.push("opprinnelse:" + facet);
        break;
        case 'arbeidsplassen':
            if(settings.value.facetFilters.opprinnelse.includes(("opprinnelse:" + facet))){
                settings.value.facetFilters.opprinnelse = settings.value.facetFilters.opprinnelse.filter(e => e != ("opprinnelse:" + facet));
            }
            else settings.value.facetFilters.opprinnelse.push("opprinnelse:" + facet);
        break;
        case 'finn':
            if(settings.value.facetFilters.opprinnelse.includes(("opprinnelse:" + facet))){
                settings.value.facetFilters.opprinnelse = settings.value.facetFilters.opprinnelse.filter(e => e != ("opprinnelse:" + facet));
            }
            else settings.value.facetFilters.opprinnelse.push("opprinnelse:" + facet);
        break;w
        case 'deltid':
            if(settings.value.facetFilters.position.includes(("position:" + facet))){
                settings.value.facetFilters.position = settings.value.facetFilters.position.filter(e => e != ("position:" + facet));
            }
            else settings.value.facetFilters.position.push("position:" + facet);
        break;
        case 'fulltid':
            if(settings.value.facetFilters.position.includes(("position:" + facet))){
                settings.value.facetFilters.position = settings.value.facetFilters.position.filter(e => e != ("position:" + facet));
            }
            else settings.value.facetFilters.position.push("position:" + facet);
        break;
        case 'annet':
            if(settings.value.facetFilters.position.includes(("position:" + facet))){
                settings.value.facetFilters.position = settings.value.facetFilters.position.filter(e => e != ("position:" + facet));
            }
            else settings.value.facetFilters.position.push("position:" + facet);
        break;
        default:
        break;
    }
}

//Change TeknoCompany
function changeFacetTeknoCompany(str){
    console.log(str);
    if(settings.value.facetFilters.teknologier.includes("teknologier:" + str)){
        settings.value.facetFilters.teknologier = settings.value.facetFilters.teknologier.filter(e => e != ("teknologier:" + str));
    }
    else settings.value.facetFilters.teknologier.push("teknologier:" + str);
}


//Change company
function changeCompany(str){
    console.log(str);
    if(settings.value.facetFilters.companyName.includes("companyName:" + str)){
        settings.value.facetFilters.companyName = settings.value.facetFilters.companyName.filter(e => e != ("companyName:" + str));
    }
    else settings.value.facetFilters.companyName.push("companyName:" + str);
}

function byttAntall(str){
    settings.value.hitsPerPage = str;
}

function byttIndex(str){
    settings.value.indexType = str;
}

function byttSted(str){
    console.log(str);
    if(settings.value.facetFilters.sted.includes("sted:" + str)){
        settings.value.facetFilters.sted = settings.value.facetFilters.sted.filter(e => e != ("sted:" + str));
    }
    else settings.value.facetFilters.sted.push("sted:" + str);
}

//Search function
async function search(){
    loading.value = true;
    
    page.value = 0;
    results.value = await indexes[settings.value.indexType].search(settings.value.searchQuery, {
        facets: ["*"],
        facetFilters: [
            [...settings.value.facetFilters.opprinnelse], [...settings.value.facetFilters.position], [...settings.value.facetFilters.teknologier], [...settings.value.facetFilters.companyName], [...settings.value.facetFilters.sted]
        ],
        page: 0,
        hitsPerPage: settings.value.hitsPerPage,
    });
    console.log(results.value);
    
    loading.value = false;
}

export default {
    setup() {
        search();
        user.value = firebaseApp.auth().currentUser;
        return {
            search,
            stillingElement,
            results,
            søkeFelt,
            sorteringsWidget,
            antallTreff,
            changeSearch,
            loading,
            filterWidget,
            spinner,
            pilNed,
            changeFacet,
            changeFacetTeknoCompany,
            filterRes,
            changeCompany,
            filterBubbles,
            settings,
            byttAntall,
            byttIndex,
            byttSted,
            user,
            settings
        }
    },
}
export { settings }
</script>