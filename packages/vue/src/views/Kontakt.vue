<template>
  <main class="homepage container">
    <form class="form-horizontal">
      <div class="stackedit__html">
        <div class="form-group">

          <br>
          <h2 class = "boldyh2">Kontakt oss:</h2>
          <hr>

          <div class="col-sm-12 p-0">
            <input style="margin-bottom:20px !important; margin-top:37px !important;" type="text" class="form-control py-4 mb-4 w-100 mt-4" id="email"
              placeholder="Ditt navn">
          </div>

          <div class="col-sm-12 p-0">
            <input style="margin-bottom:20px !important;" type="text" class="form-control py-4 mb-4 w-100" id="email"
              placeholder="Emne">
          </div>

          <div class="col-sm-12 p-0">
            <input style="margin-bottom:20px !important;" type="email" class="form-control py-4 mb-4 w-100" id="email"
              placeholder="Din epost">
          </div>

        </div>

        <div class="form-group">
          <textarea class="form-control w-100" rows="12" placeholder="Din melding"></textarea>
        </div>

        <div class="form-check mt-4 mb-2">
          <input type="checkbox" class="form-check-input" id="exampleCheck1">
          <label class="form-check-label" for="exampleCheck1">Motta en kopi av meldingen til eposten din</label>
        </div>

        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-12 p-0 w-100">
            <button type="submit" class="btn button-fixed btn-dark p-3 w-25 mt-3">Send melding</button>
          </div>
        </div>

      </div>
    </form>
    <br>
    <br>
    <br>
    <br>
  </main>
</template>

<script>
  export default {
    setup() {
      return {}
    }
  }
</script>