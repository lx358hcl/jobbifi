<template>
    <div class="col-12 m-0 p-0 d-flex justify-content-start w-100 h-100">
        <div class="container-fluid m-0 p-0 h-100">
            <div class="row w-100 m-0 h-100">
                <div v-if = "Object.values(allSaved).length > 0" class="col-3 py-0 h-100" style="max-height:100vh !important; overflow-y: scroll !important; overflow-x: hidden; border-right:2px solid #eaeaea;" role="group" aria-label="Basic example">
                    <div v-for = "(val, k) in allSaved" class="row">
                        <button type="button" class="btn m-0 p-0" :key = "k" @click = "velg(k)">
                            <div :class = "{valgtStillingsElement: k == valgtTing.id}" class = "col-12 mt-0 py-3 d-flex flex-column">
                                <LagretStillingKomponent :ting = "val"></LagretStillingKomponent>
                            </div>
                        </button>
                        <hr class = "m-0">
                    </div>
                </div>

                <div v-if = "Object.values(allSaved).length > 0" class="col-9">
                    <StillingForDashboard @endringSkjeddeEvent = "oppdaterAllSaved" :key = "valgtTing" :stilling = "valgtTing"></StillingForDashboard>
                </div>

                <div v-if="loading" class = "col-12 d-flex align-items-center justify-content-center">
                    <spinner></spinner>
                </div>

                <div v-if = "loading == false && Object.values(allSaved).length == 0" class = "col-12 d-flex align-items-center justify-content-center">
                    <p>Du har ingenting lagret</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import LagretStillingKomponent from "../components/LagretStillingKomponent.vue";
    import StillingForDashboard from "./StillingForDashboard.vue";
    import firebaseApp from "../../../firebase/firebaseconfig.js";
    import firestore from 'firebase/firestore';
    import { ref } from "vue";
    import spinner from '../components/spinner.vue';
    import { useRouter, useRoute } from 'vue-router'

    export default{
        setup(props, context){
            var allSaved = ref({});
            var valgtTing = ref("");
            var router = useRouter();
            var loading = ref(null);

            function velg(id){
                valgtTing.value = allSaved.value[id];
                router.replace({ path: 'dashboard', query: { side: 'lagrede', "stilling": valgtTing.value.id }})
            }

            function oppdaterAllSaved(obj){
                if(obj.type == "delete"){
                    console.log(allSaved.value);
                    console.log(obj.id);
                    delete allSaved.value[obj.id];
                    console.log(allSaved);
                }
                valgtTing.value = Object.values(allSaved.value)[0];
            }

            async function getInfo(){
                loading.value = true; 
                var user = await firebaseApp.auth().currentUser;
                var db = await firebaseApp.firestore();
                var data = await db.collection("users").doc(user.uid).collection("lagret").get();
                data.forEach(e => {
                    console.log(e.id);
                    allSaved.value[e.id] = e.data();
                })
                valgtTing.value = Object.values(allSaved.value)[0];
                console.log(valgtTing.value);
                console.log(allSaved);
                loading.value = false;
            }
            getInfo();
            return{
                LagretStillingKomponent,
                allSaved,
                spinner,
                valgtTing,
                StillingForDashboard,
                velg,
                oppdaterAllSaved,
                loading,              
            }
        }
    }

</script>