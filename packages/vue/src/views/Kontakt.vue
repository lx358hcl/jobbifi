<template>
  <main class="container center">
    <div class="row beholder center">
      <div class="col-12">
       <h2>
        <strong style="font-family: 'Goudy Bookletter 1911', serif !important">
          Send oss en melding
        </strong>
      </h2>
      <form class = "kontaktSkjema" method="post" v-on:submit.prevent="sendEpost()">
        <div>
          <div class="form-group">
            <hr>
            <div class="col-sm-12 p-0">
              <input required type="text" class="form-control py-4 mb-4 w-100 mt-4" id="navn" v-model="navn" placeholder="Fornavn/Etternavn">
            </div>
            <div class="col-sm-12 p-0">
              <input required name="emne" type="text" class="form-control py-4 mb-4 w-100" id="emne" v-model="emne" placeholder="Emne">
            </div>
            <div class="col-sm-12 p-0">
              <input required type="email" class="form-control py-4 mb-4 w-100" id="senderEpost" v-model="senderEpost" placeholder="Epost">
            </div>
          </div>
          <div class="form-group">
            <textarea required class="form-control w-100" rows="12" id="melding" v-model="melding" placeholder="Melding"></textarea>
          </div>
          <div class="form-check mt-4 mb-2">
            <input type="checkbox" class="form-check-input" id="mottaKopi" v-model="mottaKopi">
            <label class="gjørTilClickable form-check-label " for="mottaKopi">Motta kopi av meldingen til eposten din</label>
          </div>
          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-12 p-0 w-100">
              <button type="submit" class="btn btn-dark p-3 mt-3">
                  <span>Send Melding</span>
                </button>
            </div>
          </div>
        </div>
      </form>
    </div>
    </div>
  </main>
</template>

<script>
  import { ref, onMounted, onUpdated } from "vue";
  export default {
    setup() {
      onMounted(() => {
        window.scrollTo(0, 0);
      })
      onUpdated(() => {
        window.scrollTo(0, 0);
      })
      var [navn, emne, senderEpost, melding, mottaKopi] = [ref(""), ref(""), ref(""), ref(""), ref("")];
      async function sendEpost() {
        document.querySelector(".kontaktSkjema").innerHTML = "<p>Din melding har blitt mottatt </p>";
        
        var APIKEY = "75786fce45949903b32feb1521acfabb-07bc7b05-348b640f";
        var APIURL = "https://api.mailgun.net/v3/sandbox924f906f22f043a391c063ec30bd796f.mailgun.org";
        const mailgun = require("mailgun-js");
        const DOMAIN = 'YOUR_DOMAIN_NAME';
        const mg = mailgun({apiKey: APIKEY, domain: APIURL});
        const data = {
          from: senderEpost.value,
          to: "luka_momcilovic@hotmail.com",
          subject: emne.value,
          text: melding.value
        };
        mg.messages().send(data, function (error, body) {
          console.log(body);
        });
      }
      return {
        sendEpost,
        navn,
        emne,
        senderEpost,
        melding,
        mottaKopi,
      }
    }
  }
</script>