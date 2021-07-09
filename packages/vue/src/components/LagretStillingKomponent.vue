<template>
    <div class="p-2 row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 d-flex flex-row justify-content-center align-items-center" style="margin-bottom: 0;">
        <div class="col-11 col-sm-12 col-md-11 col-lg-4 col-xl-5 p-0">
            <div style="min-width:80px; min-height:80px;" class="d-flex align-items-center justify-content-center">
                <img class="w-75" :src="ting.companyImage">
            </div>
        </div>
        <div class="col-12 col-sm-12 col-md-11 col-lg-8 col-xl-7 h-100">
            <div class="d-flex align-items-start flex-column p-0">
                <p class="mb-0 small text-left" style="font-weight: bold;font-family: Lato;">
                    {{ ting.title }}
                </p>
                <p class="recipe-metadata py-1 text-left">
                    <span class="recipe-votes">av 
                        {{ ting.companyName }}
                    </span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import more from "../components/moreTest.vue";
    
    export default {
        props: {
            ting: Object
        },
        setup() {
            return {
                more,
            }
        }
    }
</script>