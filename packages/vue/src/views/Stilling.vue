<template>
    <main class="container center">
        <div class="row beholder center">
            <div class="col-12">
                <h2>
                    <strong style="font-family: 'Goudy Bookletter 1911', serif !important">
                        {{ stilling.title }}
                    </strong>
                </h2>
                <hr>
                <div>
                    <infoBoks :stilling="stilling"></infoBoks>
                    <p v-html="stilling.about"></p>
                </div>
            </div>
        </div>
    </main>
</template>
    
<script>
    import firebaseApp from "../../../firebase/firebaseconfig.js";
    import infoBoks from "../components/infoBoks.vue";
    import { useRouter, useRoute } from 'vue-router';
    import { ref, onMounted } from "vue";
    export default {
        setup() {
            const route = useRoute();
            var stilling = ref("");
            console.log(route);
            async function getInfo() {
                console.log(route.params);
                var db = await firebaseApp.firestore();
                var result = await db.collection("jobs").doc(route.params.id).get();
                stilling.value = result.data();
                console.log(stilling);
            }
            getInfo();
            return {
                stilling,
                infoBoks,
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