<template>
  <div class="row">
    <div class="s013 m-0 p-0">
      <div class = "d-flex justify-content-center flex-column">
        <div class="d-flex justify-content-center">
          <div class="container">

            <!-- Dette er velkomstmeldingen -->
            <h1 id="velkomstMelding">
              <b>Jobbifi</b> | For late studenter som trenger jobb
            </h1>

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
  export default{
    setup(){

      return{
        typeWriter,
        søkeboksen,
      }
    }
  }

</script>
