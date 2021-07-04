<template>
  <Nav />
  <router-view :key="$route.fullPath"></router-view>
  <Footer />
</template>

<script>
  //Fikser navbar som ikke forsvinner upon bodyclick
  $("body").click(function(event) {
    if (document.querySelector(".navbar-collapse.collapse.show") != null) {
      $(".navbar-collapse").collapse("hide");
    } else if (event.target.classList.contains("hitLinks")) {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
  });
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