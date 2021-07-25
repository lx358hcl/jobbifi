<template>
  <Nav />
  <router-view class="router-view"></router-view>
  <Footer />
</template>

<script>
  //:key="$route.fullPath"<----
  //Fikser navbar som ikke forsvinner upon bodyclick
  // $("body").click(function(event) {
  //   if (document.querySelector(".navbar-collapse.collapse.show") != null) {
  //     $(".navbar-collapse").collapse("hide");
  //   } else if (event.target.classList.contains("hitLinks")) {
  //     document.body.scrollTop = document.documentElement.scrollTop = 0;
  //   }
  // });
  //Import header og footer
  import Nav from "./components/nav.vue";
  import Footer from "./components/footer.vue";
  import firebaseApp from "../../firebase/firebaseconfig.js";
  import firestore from 'firebase/firestore';
  import {
    onBeforeUnmount
  } from "vue";
  import firebase from 'firebase';
  var db = firebaseApp.firestore();
  var usersRef = db.collection("users");
  export default {
    setup() {
      var user = firebaseApp.auth().currentUser;
      var dato = null;
      dato = firebase.firestore.Timestamp.fromDate(new Date());
      if (user) {
        setInterval(async function() {
          dato = firebase.firestore.Timestamp.fromDate(new Date());
          //Oppdaterer visningspunkt
          await usersRef.doc(user.uid).set({
            "active": dato,
          }, {
            merge: true
          })
        }, 60000);
        async function startUp() {
          await usersRef.doc(user.uid).set({
            "active": dato,
          }, {
            merge: true
          })
        }
        startUp();
      }
      return {
        Nav,
        Footer,
      }
    }
  }
</script>