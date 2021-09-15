<template>
    <div class = "w-100 mx-2 h d-flex justify-content-start flex-wrap h-auto" style = "height:40px;" role="dialog" aria-hidden="true">
        <filterBubbleCross v-for = "(key,val) in facets" :name = "key" :kategori="val">{{ key }}</filterBubbleCross>
    </div>
</template>

<script>
import filterBubbleCross from "./filterBubbleCross.vue";

export default{
    props:{
        facets: Object,
    },
    setup(){
        return{
            filterBubbleCross
        }
    }
}
</script>