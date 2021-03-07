<template>
  <main v-if="$router.currentRoute.value.href == '/'">
    <Nav />
    <router-view style="margin-top: 80px !important;" />
    <Footer style = "position:absolute;" />
  </main>
  <main v-else>
    <Nav />
    <router-view style="margin-top: 80px !important;" />
    <Footer />
  </main>
</template>

<script>
  //Import header og footer
  import Nav from "./components/nav.vue";
  import Footer from "./components/footer.vue";

  export default {
    setup() {
      return {
        Nav,
        Footer,
      }
    }
  }
</script>