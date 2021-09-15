<template class = "mt-3">
    <div v-if="stilling" :id="stilling.id" class="content d-flex justify-content-center m-0" style = "z-index: 100">
        <a :href = "stilling.originalURL">
            <button style = "color:#17171b; font-size: 16px;" :class = "{ open: opened }" class="btn btn-light p-3 font-weight-bold float-left">
                <span><i style = "font-size:14px;" class="fas fa-feather"></i></span>
                <span class = "ml-2 text-dark">Søk</span>
            </button>
        </a>
        <button v-if="user" @click="visMenu" class="shareButton buttonIcon d-flex align-items-center justify-content-center main m-0">
            <spinnerFont class = "spinIt d-flex align-items-center justify-content-center" v-if="loading"></spinnerFont>
            <i v-else class="fas fa-ellipsis-h"></i>
        </button>
        <button v-if="user" @click="visMenu" :class = "{ open: opened }" class="buttonIcon d-flex align-items-center justify-content-center shareButton fb m-0">
            <i :class = "{ bolded: bookmarka }" class="far fa-bookmark"></i>
        </button>
        <button v-if="user" @click="visMenu" :class = "{ open: opened }" class="buttonIcon d-flex align-items-center justify-content-center shareButton tw m-0">
            <i :class = "{ bolded: lika }" class="far fa-thumbs-up"></i>
        </button>
        <!--<button @click="user ? click : null" :class = "{ open: opened }" class="buttonIcon d-flex align-items-center justify-content-center shareButton ig m-0">
            <i class="far fa-flag"></i>
        </button>-->
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
            var user = ref("");
            var db = firebaseApp.firestore();

            async function getInfo(){
                user.value = await firebaseApp.auth().currentUser;
            }
            getInfo();

            async function lagreStilling() {
                var stillingKopi = props.stilling;
                delete stillingKopi["_highlightResult"];
                await db.collection("users").doc(user.value.uid).collection("lagret").doc(props.stilling.id).set(props.stilling);
            }

            async function like(){
                var likaStilling = await db.collection("users").doc(user.value.uid).collection("likaStillinger").doc(props.stilling.id).get();
                lika.value = likaStilling.exists;
                if(lika.value == true){
                    await db.collection("users").doc(user.value.uid).collection("likaStillinger").doc(props.stilling.id).delete();
                    await db.collection("jobs").doc(props.stilling.id).update({
                        "likes": firebase.firestore.FieldValue.increment(-1)
                    })
                }
                else{
                    await db.collection("users").doc(user.value.uid).collection("likaStillinger").doc(props.stilling.id).set({});
                    await db.collection("jobs").doc(props.stilling.id).update({
                        "likes": firebase.firestore.FieldValue.increment(1)
                    })
                    await db.collection("users").doc(user.value.uid).collection("likaStillinger").doc(props.stilling.id).set(props.stilling);
                }
            }

            async function visMenu(event) {
                //Viser meny
                loading.value = true;
                

                setTimeout(function(){
                    if(opened.value == true) opened.value = false;
                    else if(opened.value == false) opened.value = true;
                }, 10)

                var bookmark = await db.collection("users").doc(user.value.uid).collection("lagret").doc(props.stilling.id);
                var bookmarkData = await bookmark.get();
                var likaStilling = await db.collection("users").doc(user.value.uid).collection("likaStillinger").doc(props.stilling.id).get();

                lika.value = likaStilling.exists;
                bookmarka.value = await bookmarkData.exists;

                if(event.target.classList.contains("fa-ellipsis-h")){
                    
                }
                else if(event.target.classList.contains("fa-bookmark")){
                    if(bookmarka.value){
                        await bookmark.delete();
                        
                    }
                    else{
                        
                        await lagreStilling();
                    }
                }
                else if(event.target.classList.contains("fa-thumbs-up")){
                    
                    await like();
                }

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
            }

        }
    }
</script>