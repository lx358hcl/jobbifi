<template>
  <main class="homepage container kontaktSkjema">
    <form method="post" v-on:submit.prevent="sendEpost()">

      <div>
        <div class="form-group">
          <br>
          <h2 class="boldyh2">Kontakt oss</h2>
          <hr>

          <div class="col-sm-12 p-0">
            <input required type="text" class="form-control py-4 mb-4 w-100 mt-4" id="navn" v-model="navn" placeholder="Fornavn/Etternavn">
        </div>

          <div class="col-sm-12 p-0">
            <input required name="emne" type="text" class="form-control py-4 mb-4 w-100" id="emne" v-model="emne" placeholder="Emne">
          </div>

          <div class="col-sm-12 p-0">
            <input required type="email" class="form-control py-4 mb-4 w-100" id="mottakerEpost" v-model="mottakerEpost" placeholder="Epost">
          </div>
        </div>

        <div class="form-group">
          <textarea required class="form-control w-100" rows="12" id="melding" v-model="melding" placeholder="Melding"></textarea>
        </div>

        <div class="form-check mt-4 mb-2">
          <input type="checkbox" class="form-check-input" id="mottaKopi" v-model="mottaKopi">
          <label class="form-check-label" for="exampleCheck1">Motta kopi av meldingen til eposten din</label>
        </div>

        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-12 p-0 w-100">
            <button type="submit" class="btn btn-dark p-3 w-25 mt-3">
              <span>Send Melding</span>
            </button>
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
  import axios from "axios"; 
  import { ref } from "vue";
  export default {
    setup() {
      var [navn, emne, mottakerEpost, melding, mottaKopi] = [ref(""), ref(""), ref(""), ref(""), ref("")];
      async function sendEpost(){
        await axios.post('http://localhost:3000/api/privat/sendEpost', {
          "navn": navn.value,
          "emne": emne.value,
          "mottakerEpost": mottakerEpost.value,
          "melding": melding.value,
          "mottaKopi": mottaKopi.value,
        });
        document.querySelector("#kontaktSkjema").style.display = "none";
      }

      return {
        sendEpost,
        navn,
        emne,
        mottakerEpost,
        melding,
        mottaKopi,
      }
    }
  }
</script>