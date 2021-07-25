<template>
    <div class="container big py-0">
        <div class="p-2 row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-2 row-cols-xl-2 d-flex flex-row justify-content-center align-items-center" style="margin-bottom: 0;">
            <div class="col-11 col-sm-12 col-md-11 col-lg-4 col-xl-5 p-0">
                <div class="pizza-box">
                    <router-link class="pizza-box-img" v-bind:style="{ backgroundImage: 'url(' + companyImage + ')' }" :to="'/stilling/' + id">
                    </router-link>
                </div>
            </div>
            <div class="col-12 col-sm-12 col-md-11 col-lg-8 col-xl-7">
                <div class="recipe-content p-0">
                    <p class="recipe-tags">
                        <span v-for="(t, index) in teknologier" :key="t.objectID" class="recipe-tag my-1" style="letter-spacing:0px">{{ index < 7 ? t : '' }}</span>
                    </p>
                    <h1 style="text-shadow: 0px 0px 1px #000; letter-spacing:-1px; font-weight: 500;" class="mt-2 recipe-title">
                        <router-link :to="'/stilling/' + id">{{ title }}</router-link>
                    </h1>
                    <p class="recipe-metadata py-1">
                        <span class="recipe-votes text-dark">av 
                            {{ companyName }}
                        </span>
                    </p>
                    <router-link :to="'/stilling/' + id"><p style="word-break: break-word;" class="recipe teaser m-0 mb-1 text-dark">{{ teaser }}</p></router-link>
                    <more class="mt-3 mb-3" v-if="user" :stilling="stilling" :id="id"></more>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import upvoteDownvote from "../components/upvoteDownvote.vue";
    import bookmark from "../components/bookmark.vue";
    import more from '../components/moreTest.vue';
    export default {
        props: {
            title: String,
            teaser: String,
            companyImage: String,
            companyName: String,
            teknologier: Array,
            id: String,
            stilling: Object,
            user: Object,
        },
        setup() {
            return {
                upvoteDownvote,
                bookmark,
                more,
            }
        }
    }
</script>
