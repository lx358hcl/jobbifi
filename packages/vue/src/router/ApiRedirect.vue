<script>
  import router from "./index.js";
  // import { ref, reactive } from "vue";
  // const axios = require('axios');

  export default {
    setup() {
      var usersAPIquery = router.currentRoute.value.href;
      console.log(router);
      console.log(router.currentRoute);
      console.log(router.currentRoute.value);
      console.log(router.currentRoute.value.href);
      console.log(usersAPIquery);
      window.location.href = `http://localhost:4100${usersAPIquery}`;

      //     router.push({ name: 'user', params: { userId: 123 }})
      //     router.go("http://localhost:3000${usersAPIquery}")
      //     var data = ref("");

      //     axios.get(`http://localhost:3000${usersAPIquery}`)
      //       .then(function (response) {
      //         data.value = JSON.stringify(response);
      //         console.log(data.value)
      //         router.send(data);
      //       })
      //       .catch(function (error) {
      //         console.log(error);
      //       });

      return {

      }
    }
  }
</script>