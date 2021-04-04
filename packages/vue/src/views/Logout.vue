<template>
  <div>
    <h3>
      Du er logget ut
    </h3>
  </div>
</template>

<script>
  export default {
    setup() {
      window.location = window.location.origin + "/";
      return {

      }
    }
  }
</script>
