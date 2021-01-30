<template style>
  <div class="container hjem d-flex justify-content-center">
    <div style="margin-bottom:0px !important;" class="row p-0 m-0 d-flex justify-content-center">
      <div class="s013">
        <søkeform />
      </div>
    </div>
  </div>
</template>

<script>
  import søkeform from "../components/søkeform.vue";
  export default {
    setup() {
      console.log("hjem");
      return {
        søkeform,
      }
    }
  }
</script>