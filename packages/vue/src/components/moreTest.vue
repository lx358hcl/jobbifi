<template class = "mt-3">
    <div v-if="stilling" :id="stilling.id" class="content d-flex justify-content-center m-0">
        <button @click="visMenu" class="shareButton buttonIcon d-flex align-items-center justify-content-center main m-0">
            <spinnerFont class = "spinIt d-flex align-items-center justify-content-center" v-if="loading"></spinnerFont>
            <i v-else class="fas fa-ellipsis-h"></i>
        </button>
        <button @click="visMenu" :class = "{ open: opened }" class="buttonIcon d-flex align-items-center justify-content-center shareButton fb m-0">
            <i :class = "{ bolded: bookmarka }" class="far fa-bookmark"></i>
        </button>
        <button @click="visMenu" :class = "{ open: opened }" class="buttonIcon d-flex align-items-center justify-content-center shareButton tw m-0">
            <i :class = "{ bolded: lika }" class="far fa-thumbs-up"></i>
        </button>
        <button @click="visMenu" :class = "{ open: opened }" class="buttonIcon d-flex align-items-center justify-content-center shareButton ig m-0">
            <i class="far fa-flag"></i>
        </button>
    </div>
</template>

<script>
    import firebaseApp from "../../../firebase/firebaseconfig.js";
    import firestore from 'firebase/firestore';
    import { ref } from "vue";
    import spinnerFont from '../components/spinnerFont.vue';
    import firebase from "firebase";

    export default {
        props: {
            stilling: Object,
        },
        setup(props) {
            //Henter data
            var bookmarka = ref(false);
            var lika = ref(false);
            var loading = ref(false);
            var opened = ref(false);

            console.log(props)

            async function lagreStilling() {
                console.log(props.stilling)
                var user = await firebaseApp.auth().currentUser;
                var db = await firebaseApp.firestore();
                var stillingKopi = props.stilling;
                delete stillingKopi["_highlightResult"];
                console.log(props.stilling.id);
                await db.collection("users").doc(user.uid).collection("lagret").doc(props.stilling.id).set(props.stilling);
            }

            async function like(){
                console.log(props.stilling);
                var user = await firebaseApp.auth().currentUser;
                var db = await firebaseApp.firestore();
                var likaStilling = await db.collection("users").doc(user.uid).collection("likaStillinger").doc(props.stilling.id).get();
                lika.value = likaStilling.exists;
                if(lika.value == true){
                    await db.collection("users").doc(user.uid).collection("likaStillinger").doc(props.stilling.id).delete();
                    await db.collection("jobs").doc(props.stilling.id).update({
                        "likes": firebase.firestore.FieldValue.increment(-1)
                    })
                }
                else{
                    await db.collection("users").doc(user.uid).collection("likaStillinger").doc(props.stilling.id).set({});
                    await db.collection("jobs").doc(props.stilling.id).update({
                        "likes": firebase.firestore.FieldValue.increment(1)
                    })
                }
                console.log(likaStilling.exists);
            }

            async function visMenu(event) {
                //Viser meny
                loading.value = true;
                var user = await firebaseApp.auth().currentUser;
                var db = await firebaseApp.firestore();
                var bookmark = await db.collection("users").doc(user.uid).collection("lagret").doc(props.stilling.id);
                var bookmarkData = await bookmark.get();
                var likaStilling = await db.collection("users").doc(user.uid).collection("likaStillinger").doc(props.stilling.id).get();
                lika.value = likaStilling.exists;
                console.log(lika.value);
                bookmarka.value = await bookmarkData.exists;

                if(event.target.classList.contains("fa-ellipsis-h")){
                    console.log(bookmarka.value)
                }
                else if(event.target.classList.contains("fa-bookmark")){
                    if(bookmarka.value){
                        await bookmark.delete();
                        console.log("slettet");
                    }
                    else{
                        console.log("lagrer");
                        await lagreStilling();
                    }
                }
                else if(event.target.classList.contains("fa-thumbs-up")){
                    console.log("liker");
                    await like();
                }
                if(opened.value == true) opened.value = false;
                else if(opened.value == false) opened.value = true;

                loading.value = false;
            }
            
            return {
                visMenu,
                bookmarka,
                loading,
                spinnerFont,
                opened,
                lika,
            }

        }
    }
</script>