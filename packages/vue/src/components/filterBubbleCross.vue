<template>
    <button v-for = "n in name" @click="fjernFacet(n)" type="button" class="float-left m-1 filterBubbles btn btn-dark btn-sm">
      <span>{{ n.split(':')[1] }}
        <i class="fas fa-times filterBubbleX"></i>
      </span>
    </button>
</template>

<style>
    .filterBubbles {
        border-radius: 30px;
    }
    .filterBubbleX {
        font-size: 12px;
        margin-left: 5px;
    }
</style>

<script>
import { settings } from "../views/Stillinger.vue";


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

function changeSted(str){
    console.log(str);
    if(settings.value.facetFilters.sted.includes("sted:" + str)){
        settings.value.facetFilters.sted = settings.value.facetFilters.sted.filter(e => e != ("sted:" + str));
    }
    else settings.value.facetFilters.sted.push("sted:" + str);
}

function fjernFacet(event){
    console.log(event)
    var params = event.split(":");
    console.log(params);
    if(params[0] == "position" || params[0] == "opprinnelse") changeFacet(params[1]);
    else if(params[0] == "companyName") changeCompany(params[1]);
    else if(params[0] == "teknologier") changeFacetTeknoCompany(params[1]);
    else if(params[0] == "sted") changeSted(params[1]);

    // facetFilters: [
    //     [...settings.value.facetFilters.opprinnelse], [...settings.value.facetFilters.position], [...settings.value.facetFilters.teknologier], [...settings.value.facetFilters.companyName]
    // ],
}

export default{
    props:{
        name: String,
        kategori: String,
    },
    setup(){
        console.log(settings);
        
        return{
            fjernFacet,
        }
    }
}

</script>