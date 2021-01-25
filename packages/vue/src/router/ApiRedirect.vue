<script>
  import router from "./index.js";

  export default {
    setup() {
      var usersAPIquery = router.currentRoute.value.href;
      window.location.href = `http://localhost:3000${usersAPIquery}`;
      return {

      }
    }
  }
</script>