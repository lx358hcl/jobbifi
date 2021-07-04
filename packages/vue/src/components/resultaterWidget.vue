<template>
    <div class="container p-0" style="margin-bottom: 11px;">
        <div class="row d-flex d-sm-flex justify-content-center justify-content-sm-center mx-2">
            <div class="col-md-9 p-0">
                <!--Stillingsseksjon-->
                <stillingElement v-if="results" v-for="stilling in results.hits" :title="stilling.title" :companyImage="stilling.companyImage" :key="stilling.objectID" :teaser="stilling.teaser" :teknologier="stilling.teknologier"></stillingElement>
            </div>
        </div>
    </div>
</template>

<script>
import stillingElement from "./stillingElement.vue";

export default{
    props:{
        results: Object,
    },
    setup(){
        return{
            stillingElement,
        }
    }
}

</script>