<template>
    <main class="d-flex justify-content-center page contact-us-page" style="min-height: calc(100vh - 294px);">
        <div class="container-fluid m-0 p-0" style="margin-top: 28px;">
            <div class = "row w-100 h-100 m-0 p-0 d-flex">
                <div class = "venstreSide col-2 m-0 p-0 w-100 h-100 ">
                    <div class="btn-group-vertical float-right p-3 pt-1" role="group" aria-label="Basic example">
                        <button :class = "{valgtSide: valgtStr == 'profil', aktivtIkon: valgtStr == 'profil'}" @click = "velgKomponent('profil')" type="button" class="sideBarButton d-flex align-items-center btn btn-link text-dark font-weight-bold rounded my-2">
                            <i class="mr-4 sideBarIkon fas fa-user-circle"></i>
                            Profil
                        </button>
                        <button :class = "{valgtSide: valgtStr == 'lagrede', aktivtIkon: valgtStr == 'lagrede'}"  @click = "velgKomponent('lagrede')" type="button" class="sideBarButton d-flex align-items-center btn btn-link rounded text-dark font-weight-bold my-2">
                            <i class="mr-4 sideBarIkon fas fa-bookmark"></i>
                            Lagrede
                        </button>
                        <button :class = "{valgtSide: valgtStr == 'likede', aktivtIkon: valgtStr == 'likede'}"  @click = "velgKomponent('likede')" type="button" class="sideBarButton d-flex align-items-center btn btn-link rounded text-dark font-weight-bold my-2">
                            <i class="mr-4 sideBarIkon fas fa-thumbs-up"></i>
                            Likede
                        </button>
                        <button :class = "{valgtSide: valgtStr == 'meldinger', aktivtIkon: valgtStr == 'meldinger'}"  @click = "velgKomponent('meldinger')" type="button" class="sideBarButton d-flex align-items-center btn btn-link rounded text-dark font-weight-bold my-2">
                            <i class="mr-4 sideBarIkon fas fa-inbox"></i>
                            Meldinger
                        </button>
                        <button :class = "{valgtSide: valgtStr == 'innstillinger', aktivtIkon: valgtStr == 'innstillinger'}"  @click = "velgKomponent('lagrede')" type="button" class="sideBarButton d-flex align-items-center btn btn-link rounded text-dark font-weight-bold my-2">
                            <i class="mr-4 sideBarIkon fas fa-sliders-h"></i>
                            Innstillinger
                        </button>
                        <button @click = "logOut()" type="button" class="sideBarButton d-flex align-items-center btn btn-link rounded text-dark font-weight-bold my-2">
                            <i class="mr-4 sideBarIkon fas fa-sign-out-alt"></i>
                            Logg ut
                        </button>

                    </div>
                </div>
                <div style = "border-top: 2px solid rgb(243, 243, 245)" class = "col-10 m-0 p-0 pb-5">
                    <component ref = "valgtKomponent" :is = "valgt"></component>
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
    import { ref } from "vue";
    import { useRouter, useRoute } from 'vue-router'
    import firebaseApp from "../../../firebase/firebaseconfig.js";

    var valgt = ref(Secret);
    var valgtStr = ref("profil");
    var valgtKomponent = ref(null);

    export default{
        setup(){
            //Logg ut funksjon
            function logOut() {
                firebaseApp.auth().signOut();
                window.location = window.location.origin + "/login";
            }
            var router = useRouter();
            var currentRoute;

            if(router.currentRoute.value.query.side) {
                currentRoute = router.currentRoute.value.query.side;
                velgKomponent(currentRoute);
            }
            else{
                velgKomponent("profil");
            }
            
            function velgKomponent(str){
                console.log(str);
                if(str == "profil") {
                    valgt.value = Secret;
                    router.push({ path: 'dashboard', query: { side: 'profil' } })
                }
                else if(str == "lagrede") {
                    valgt.value = LagredeStillinger;
                    router.push({ path: 'dashboard', query: { side: 'lagrede' } })
                }
                else if(str == "likede") {
                    valgt.value = Likede;
                    router.push({ path: 'dashboard', query: { side: 'likede' } })
                }
                else if(str == "meldinger") {
                    valgt.value = Meldinger;
                    router.push({ path: 'dashboard', query: { side: 'meldinger' } })
                }

                valgtStr.value = str;
            }
            return{
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