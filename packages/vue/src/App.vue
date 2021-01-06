<template>
  <main>
    <Nav />
    <router-view style = "margin-top:70px !important;" />
    <Footer />
  </main>
</template>

<script>
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