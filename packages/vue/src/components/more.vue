<template :key = "stilling" class = "mt-3">
    <div v-if="stilling" :id="stilling.id" class="content d-flex justify-content-center m-0">
        <a :href = "stilling.originalURL">
            <button style = "color:#17171b; font-size: 16px;" :class = "{ open: true }" class="btn btn-light p-3 font-weight-bold mx-2">
                <span><i style = "font-size:14px;" class="fas fa-feather"></i></span>
                <span class = "ml-2 text-dark">Søk på stillingen</span>
            </button>
        </a>
        <button v-if="user" @click="fjernStilling(stilling.id)" :class = "{ open: true }" class="buttonIcon d-flex align-items-center justify-content-center shareButton fb m-0">
            <i :class = "{ bolded: bookmarka }" class="far fa-bookmark"></i>
        </button>
        <button v-if="user" @click="fjernLike(stilling.id)" :class = "{ open: true }" class="buttonIcon d-flex align-items-center justify-content-center shareButton tw m-0">
            <i :class = "{ bolded: lika }" class="far fa-thumbs-up"></i>
        </button>
    </div>
</template>

<script>
    import { ref, onMounted } from "vue";
    import firebaseApp from "../../../firebase/firebaseconfig.js";
    import firestore from 'firebase/firestore';
    import spinnerFont from '../components/spinnerFont.vue';
    import firebase from "firebase";

    export default {
        props: {
            stilling: Object,
        },
        setup(props, context) {
            //Henter data
            var bookmarka = ref(false);
            var lika = ref(false);
            var loading = ref(false);
            var opened = ref(false);
            var user = ref("");
            var db = firebaseApp.firestore();

            async function getInfo(){
                user.value = await firebaseApp.auth().currentUser;
                var bookmark = await db.collection("users").doc(user.value.uid).collection("lagret").doc(props.stilling.id);
                var bookmarkData = await bookmark.get();
                var likaStilling = await db.collection("users").doc(user.value.uid).collection("likaStillinger").doc(props.stilling.id).get();
                lika.value = likaStilling.exists;
                bookmarka.value = await bookmarkData.exists;
            }

            getInfo();

            async function fjernStilling(id) {
                var stillingKopi = props.stilling;
                await db.collection("users").doc(user.value.uid).collection("lagret").doc(props.stilling.id).delete();
                context.emit("endringSkjeddeEvent", {
                    type: "delete",
                    id: id,
                });
                getInfo();
            }

            async function fjernLike(id){
                var likaStilling = await db.collection("users").doc(user.value.uid).collection("likaStillinger").doc(props.stilling.id).get();
                lika.value = likaStilling.exists;
                await db.collection("users").doc(user.value.uid).collection("likaStillinger").doc(props.stilling.id).delete();
                await db.collection("jobs").doc(props.stilling.id).update({
                    "likes": firebase.firestore.FieldValue.increment(-1)
                })
                context.emit("endringSkjeddeEvent", {
                    type: "unlike",
                    id: id,
                });
                getInfo();
            }

            async function visMenu(event) {
                //Viser meny
                loading.value = true;

                setTimeout(function(){
                    if(opened.value == true) opened.value = false;
                    else if(opened.value == false) opened.value = true;
                }, 10)
                               
                loading.value = false;
            }
            
            return {
                visMenu,
                bookmarka,
                loading,
                spinnerFont,
                opened,
                lika,
                user,
                fjernLike,
                fjernStilling,
            }

        }
    }
</script>