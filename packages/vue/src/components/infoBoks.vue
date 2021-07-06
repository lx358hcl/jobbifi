<template>
    <!--<div class="container big py-0 pb-4 my-5 mx-0 px-0 ">
            <div class="p-0 row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 d-flex flex-row justify-content-center align-items-center" style="margin-bottom: 0;">
                <div class="mb-4 col-11 col-sm-12 col-md-11 col-lg-12 col-xl-12 p-0">
                    <div class="pizza-box">
                        <div style = "background-size: cover;" class="pizza-box-img w-100 h-100" v-bind:style="{ backgroundImage: 'url(' + stilling.companyImage + ')' }"></div>
                    </div>
                </div>
                <div class="col-12 col-sm-12 col-md-11 col-lg-8 col-xl-7">
                    <div class="recipe-content p-0">
                        <p class="recipe-tags">
                            <span v-for="(t, index) in stilling.teknologier" :key="t.objectID" class="recipe-tag my-1" style = "letter-spacing:0px" >{{ index < 7 ? t : '' }}</span>
                        </p>
                        <h1 style = "text-shadow: 0px 0px 1px #000; letter-spacing:-1px; font-weight: 500;" class="mt-2 recipe-title">
                            <router-link :to="'/stilling/' + stilling.id">{{ title }}</router-link>
                        </h1>
                        <p class="recipe-metadata"> 
                            <p class="mb-0 recipe-votes"> <b>Selskap: </b>
                                <router-link :to="'/' + stilling.id" class = "text-dark" href="#">{{ stilling.companyName + " "}}</router-link> 
                            </p>
                            <p class="recipe-votes mb-0"><b>Selskapets rangering: </b> <span class="recipe-rating">★★★★☆</span></p>
                            <p class="recipe-votes mb-0"><b>Frist:</b> <span class="text-danger recipe-rating">ji</span></p>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        -->
    <div class="jumbotron">
        <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
        <hr class="my-4">
        <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
        <p class="lead">
            <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
        </p>
    </div>
</template>

<script>
    export default {
        props: {
            stilling: Object,
        },
        setup() {
            return {}
        }
    }
</script>