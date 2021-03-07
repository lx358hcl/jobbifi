<template>
  <div class="row">
    <div class="s013 m-0 p-0">
      <div class="d-flex justify-content-center flex-column">
        <!-- Dette er velkomstmeldingen -->
        <div class="container">
          <div class="row">

            <div class="col-12">
            <h1 id="velkomstMelding" class = "d-flex align-items-center">
              <b>Jobbifi&nbsp;</b> | For informatikkstudenter
            </h1>
          </div>

          </div>
          
        </div>
        <div class="d-flex justify-content-center">
          <div class="container">
            <!-- Dette er den bevegelige teksten -->
            <typeWriter />
            <!-- Dette er søkeboksen -->
            <søkeboksen />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import typeWriter from "./typeWriter.vue";
  import søkeboksen from "./søkeboksen.vue";
  export default {
    setup() {
      return {
        typeWriter,
        søkeboksen,
      }
    }
  }
</script>
