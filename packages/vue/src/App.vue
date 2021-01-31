<template>
  <main v-if="$router.currentRoute.value.href == '/'">
    <Nav />
    <router-view style="margin-top: 80px !important;" />
    <Footer style = "position:absolute;" />
  </main>
  <main v-else>
    <Nav />
    <router-view style="margin-top: 100px !important;" />
    <Footer />
  </main>
</template>

<script>
<<<<<<< HEAD
  //Import header og footer
  import Nav from "./components/nav.vue";
  import Footer from "./components/footer.vue";

=======
  import Nav from "./components/nav.vue";
  import Footer from "./components/footer.vue";
>>>>>>> cd212d7ffbb92ecee196d5f29f80185a3347af93
  export default {
    setup() {
      return {
        Nav,
        Footer,
      }
    }
  }
</script>