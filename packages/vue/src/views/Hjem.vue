<template>
  <div class="container hjem d-flex justify-content-center">
    <div style="margin-bottom:150px !important;" class="row p-0 m-0 d-flex justify-content-center">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="author" content="colorlib.com">
        <link href="https://fonts.googleapis.com/css?family=Poppins:400,500,700" rel="stylesheet" />
      </head>
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
      return {
        søkeform,
      }
    }
  }
</script>

