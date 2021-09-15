<template :key = "stilling" class = "mt-3">
    <div v-if="stilling" :id="stilling.id" class="content row w-100 d-flex justify-content-start m-0 py-2">
        <div class = "col-12 d-flex align-items-center m-0 p-0">
            <div class = "float-left">
                <a :href = "stilling.originalURL">
                    <button style = "color:#17171b; font-size: 16px;" :class = "{ open: true }" class="btn btn-light p-3 font-weight-bold mx-2">
                        <span><i style = "font-size:14px;" class="fas fa-feather"></i></span>
                        <span class = "ml-2 text-dark">Søk på stillingen</span>
                    </button>
                </a>
            </div>
            <div class = "float-left">
                <button v-if="user && !stillingLoading" @click="stilling(stilling.id)" :class = "{ open: true }" class="buttonIcon d-flex align-items-center justify-content-center shareButton fb m-0">
                    <i :class = "{ bolded: bookmarka }" class="far fa-bookmark"></i>
                </button>
                <spinnerFont v-else class = "spinIt d-flex align-items-center justify-content-center px-4"></spinnerFont>
            </div>
            <div class = "float-left">
                <button v-if="user && !likeLoading" @click="like(stilling.id)" :class = "{ open: true }" class="buttonIcon d-flex align-items-center justify-content-center shareButton tw m-0">
                    <i :class = "{ bolded: lika }" class="far fa-thumbs-up"></i>
                </button>
                <spinnerFont v-else class = "spinIt d-flex align-items-center justify-content-center px-4"></spinnerFont>
            </div>
        </div>
    </div>
</template>

<script>
    import { ref, onMounted } from "vue";
    import firebaseApp from "../../../firebase/firebaseconfig.js";
    import firestore from 'firebase/firestore';
    import spinnerFont from '../components/spinnerFont.vue';
    import firebase from "firebase";
    import { useRouter, useRoute } from 'vue-router'

    export default {
        props: {
            stilling: Object,
        },
        setup(props, context) {
            //Henter data
            var bookmarka = ref(false);
            var lika = ref(false);
            var stillingLoading = ref(false);
            var likeLoading = ref(false);
            var opened = ref(false);
            var user = ref("");
            user.value = firebaseApp.auth().currentUser;
            var db = firebaseApp.firestore();
            var router = useRouter();
            var likaStilling;
            var bookmark;
            var bookmarkData;

            async function getInfo(){
                if(router.currentRoute.value.query.side == "lagrede"){
                    bookmarka.value = true;
                    likaStilling = await db.collection("users").doc(user.value.uid).collection("likaStillinger").doc(props.stilling.id).get();
                    lika.value = await likaStilling.exists;
                }
                else if(router.currentRoute.value.query.side == "likede"){
                    lika.value = true;
                    bookmark = await db.collection("users").doc(user.value.uid).collection("lagret").doc(props.stilling.id);
                    bookmarkData = await bookmark.get();
                    bookmarka.value = await bookmarkData.exists;
                }
            }

            getInfo();

            async function stilling(id) {
                stillingLoading.value = true;
                if(bookmarka.value){
                    context.emit("endringSkjeddeEvent", {
                        type: "delete",
                        id: props.stilling.id,
                        type2: "stilling",
                    });
                    await db.collection("users").doc(user.value.uid).collection("lagret").doc(props.stilling.id).delete();
                }
                else{
                    var stillingKopi = props.stilling;
                    delete stillingKopi["_highlightResult"];
                    context.emit("endringSkjeddeEvent", {
                        type: "lagring",
                        type2: "stilling",
                        id: props.stilling.id,
                    });
                    await db.collection("users").doc(user.value.uid).collection("lagret").doc(props.stilling.id).set(props.stilling);
                }
                await getInfo();
                stillingLoading.value = false;
            }

            async function like(id){
                likeLoading.value = true;
                var likaStilling = await db.collection("users").doc(user.value.uid).collection("likaStillinger").doc(props.stilling.id).get();
                lika.value = likaStilling.exists;
                if(lika.value == true){
                    context.emit("endringSkjeddeEvent", {
                        type: "delete",
                        type2: "like",
                        id: props.stilling.id,
                    });
                    await db.collection("users").doc(user.value.uid).collection("likaStillinger").doc(props.stilling.id).delete();
                    try{
                        await db.collection("jobs").doc(props.stilling.id).update({
                            "likes": firebase.firestore.FieldValue.increment(-1)
                        })
                    }
                    catch{}
                }
                else{
                    context.emit("endringSkjeddeEvent", {
                        type: "lagring",
                        id: props.stilling.id,
                        type2: "like",
                    });
                    await db.collection("users").doc(user.value.uid).collection("likaStillinger").doc(props.stilling.id).set({});
                    
                    try{
                        await db.collection("jobs").doc(props.stilling.id).update({
                            "likes": firebase.firestore.FieldValue.increment(1)
                        })
                    }
                    catch{}
                    await db.collection("users").doc(user.value.uid).collection("likaStillinger").doc(props.stilling.id).set(props.stilling);
                }
                await getInfo();
                likeLoading.value = false;
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
                stillingLoading,
                likeLoading,
                spinnerFont,
                opened,
                lika,
                user,
                like,
                stilling,
            }

        }
    }
</script>