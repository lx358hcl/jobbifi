<template>
    <div class="col-9 m-0 p-0 d-flex justify-content-start h-100">
        <div class="container-fluid m-0 p-0 h-100">
            <div class="row w-100 m-0 h-100">
                <div class="col-4 py-2 h-100"  style="border-right:2px solid #eaeaea;" role="group" aria-label="Basic example">
                    <div class="row">
                        <div class="col-12 mt-0">
                            <button v-for = "ting in allSaved" type="button" class="btn btn-white m-0">
                                <LagretStillingKomponent :ting = "ting"></LagretStillingKomponent>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-8">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import LagretStillingKomponent from "../components/LagretStillingKomponent.vue";
    import firebaseApp from "../../../firebase/firebaseconfig.js";
    import firestore from 'firebase/firestore';
    import { ref } from "vue";
    import spinnerFont from '../components/spinnerFont.vue';


    export default{
        setup(){
            var allSaved = ref([]);
            async function getInfo(){
                var user = await firebaseApp.auth().currentUser;
                var db = await firebaseApp.firestore();
                var data = await db.collection("users").doc(user.uid).collection("lagret").get();
                data.forEach(e => {
                    allSaved.value.push(e.data());
                    console.log(e.data());
                })
            }
            getInfo();
            return{
                LagretStillingKomponent,
                allSaved,
            }
        }
    }

</script>