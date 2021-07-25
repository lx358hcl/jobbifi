<template>
    <main class="d-flex justify-content-center page contact-us-page" style="min-height: calc(100vh - 294px);">
        <div class="container-fluid m-0 p-0" style="margin-top: 28px;">
            <div class="row w-100 h-100 m-0 p-0 d-flex">
                <div class="venstreSide col-2 m-0 p-0 w-100 h-100">
                    <div class="row w-100 px-0 m-0">
                        <div class="col-12 m-0 p-0 d-flex justify-content-center">
                            <button class = "btn btn-link text-dark font-weight-bold rounded my-3 py-0" :class="{valgtSide: valgtStr == 'profil', aktivtIkon: valgtStr == 'profil'}" @click="velgKomponent('profil')" type="button">
                                <div class = "row d-flex justify-content-center align-items-center">
                                    <div class = "col-3 d-flex justify-content-center">
                                        <i style = "font-size:18px;" class="mr-0 sideBarIkon fas fa-user-circle"></i>
                                    </div>
                                    <div class = "col-8 d-none d-md-block">
                                        <span class = "d-none d-md-block">Profil</span>
                                    </div>
                                </div>
                            </button>
                        </div>
                        <div class="col-12 m-0 p-0 d-flex justify-content-center">
                            <button class = "btn btn-link text-dark font-weight-bold rounded my-3 py-0" :class="{valgtSide: valgtStr == 'lagrede', aktivtIkon: valgtStr == 'lagrede'}" @click="velgKomponent('lagrede')" type="button">
                                <div class = "row d-flex justify-content-center align-items-center">
                                    <div class = "col-3 d-flex justify-content-center">
                                        <i style = "font-size:18px;" class="mr-0 sideBarIkon fas fa-bookmark"></i>
                                    </div>
                                    <div class = "col-8 d-none d-md-block">
                                        <span class = "d-none d-md-block">Lagrede</span>
                                    </div>
                                </div>
                            </button>
                        </div>
                        <div class="col-12 m-0 p-0 d-flex justify-content-center">
                            <button class = "btn btn-link text-dark font-weight-bold rounded my-3 py-0" :class="{valgtSide: valgtStr == 'likede', aktivtIkon: valgtStr == 'likede'}" @click="velgKomponent('likede')" type="button">
                                <div class = "row d-flex justify-content-center align-items-center">
                                    <div class = "col-3 d-flex justify-content-center">
                                        <i style = "font-size:18px;" class="mr-0 sideBarIkon fas fa-thumbs-up"></i>
                                    </div>
                                    <div class = "col-8 d-none d-md-block">
                                        <span class = "d-none d-md-block">Likede</span>
                                    </div>
                                </div>
                            </button>
                        </div>
                        <div class="col-12 m-0 p-0 d-flex justify-content-center">
                            <button class = "btn btn-link text-dark font-weight-bold rounded my-3 py-0" @click="logOut()" type="button">
                                <div class = "row d-flex justify-content-center align-items-center">
                                    <div class = "col-3 d-flex justify-content-center">
                                         <i style = "font-size:20px;" class="mr-0 sideBarIkon fas fa-sign-out-alt"></i>
                                    </div>
                                    <div class = "col-8 d-none d-md-block">
                                        <span class = "d-none d-md-block">Logg ut</span>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <div style="border-top: 2px solid rgb(243, 243, 245)" class="col-10 m-0 p-0 pb-5">
                    <component ref="valgtKomponent" :is="valgt"></component>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
    import more from "../components/moreTest.vue";
    import Secret from "./Secret.vue";
    import Meldinger from "./Meldinger.vue";
    import LagredeStillinger from "./LagredeStillinger.vue";
    import Likede from "./Likede.vue";
    import {
        ref, onMounted,
    } from "vue";
    import {
        useRouter,
        useRoute
    } from 'vue-router'
    import firebaseApp from "../../../firebase/firebaseconfig.js";
    var valgt = ref(Secret);
    var valgtStr = ref("profil");
    var valgtKomponent = ref(null);
    //Logg ut funksjon
    function logOut() {
        firebaseApp.auth().signOut();
        window.location = window.location.origin + "/login";
    }
    export default {
        setup() {
            var router = useRouter();
            var query = router.currentRoute.value.query;
            console.log(router.currentRoute);
            if (Object.keys(query).length > 0) {
                velgKomponent(query);
            } else {
                velgKomponent("profil");
            }
            function velgKomponent(query) {
                var str = null;
                if (query.side) {
                    str = query.side;
                } else {
                    str = query;
                }
                if (str == "profil") {
                    valgt.value = Secret;
                    router.push({
                        name: 'Dashboard',
                        query: {
                            side: 'profil'
                        }
                    })
                } else if (str == "lagrede") {
                    valgt.value = LagredeStillinger;
                    router.push({
                        name: 'Dashboard',
                        query: {
                            side: 'lagrede'
                        }
                    })
                } else if (str == "likede") {
                    valgt.value = Likede;
                    router.push({
                        name: 'Dashboard',
                        query: {
                            side: 'likede'
                        }
                    })
                } else if (str == "meldinger") {
                    valgt.value = Meldinger;
                    var chatID2 = query.chatID;
                    if (chatID2) router.push({
                        name: 'Dashboard',
                        query: {
                            "side": 'meldinger',
                            "chatID": chatID2
                        }
                    });
                    else router.push({
                        name: 'Dashboard',
                        query: {
                            side: 'meldinger'
                        }
                    })
                }
                valgtStr.value = str;
            }
            return {
                more,
                valgt,
                Secret,
                velgKomponent,
                valgtStr,
                logOut,
            }
        }
    }
</script>