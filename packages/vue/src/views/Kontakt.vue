<template>
  <main class="homepage container">
    <form method="post">

      <div>
        <div class="form-group">
          <br>
          <h2 class="boldyh2">Kontakt oss:</h2>
          <hr>

          <div class="col-sm-12 p-0">
            <input required type="text" class="form-control py-4 mb-4 w-100 mt-4" id="navn" placeholder="Fornavn/Etternavn">
          </div>

          <div class="col-sm-12 p-0">
            <input required name="emne" type="text" class="form-control py-4 mb-4 w-100" id="emne" placeholder="Emne">
          </div>

          <div class="col-sm-12 p-0">
            <input required type="email" class="form-control py-4 mb-4 w-100" id="mottakerEpost" placeholder="Epost">
          </div>
        </div>

        <div class="form-group">
          <textarea required class="form-control w-100" rows="12" id="melding" placeholder="Melding"></textarea>
        </div>

        <div class="form-check mt-4 mb-2">
          <input type="checkbox" class="form-check-input" id="mottaKopi">
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
  export default {
    setup() {
      async function sendEpost(){
        await axios.post('http://localhost:3000/api/privat/sendEpost', {
          "navn": "Luka",
          "emne": "Luka er mitt navn",
          "mottakerEpost": "request.mottakerEpost",
          "melding": "request.melding",
          "mottaKopi": "request.mottaKopi"
        })
      }
      sendEpost();
      //SMS tjenesten
      // var api = require('clicksend');

      // var smsMessage = new api.SmsMessage();

      // smsMessage.from = "Luka";
      // smsMessage.to = "+4741357378";
      // smsMessage.body = "${}";

      // var smsApi = new api.SMSApi("luka_momcilovic@hotmail.com", "3C85F0F8-A63C-8570-2BC5-BCB9964C0A4B");

      // var smsCollection = new api.SmsMessageCollection();

      // smsCollection.messages = [smsMessage];

      // smsApi.smsSendPost(smsCollection).then(function (response) {
      //   console.log(response.body);
      // }).catch(function (err) {
      //   console.error(err.body);
      // });
      // console.log("da er den sendt");

      return {

      }
    }
  }
</script>