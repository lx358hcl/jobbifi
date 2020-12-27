<template>
  <main class="homepage container">
    <form action="https://send.pageclip.co/ZCrwpPAbwyLCEO1KpRr33ILUUlwu3JZH" class="form-horizontal pageclip-form"
      method="post">

      <div class="stackedit__html">
        <div class="form-group">

          <br>
          <h2 class="boldyh2">Kontakt oss:</h2>
          <hr>

          <div class="col-sm-12 p-0">
            <input required style="margin-bottom:20px !important; margin-top:37px !important;" type="text"
              class="form-control py-4 mb-4 w-100 mt-4" name="navn" id="email" placeholder="Fornavn/Etternavn">
          </div>

          <div class="col-sm-12 p-0">
            <input required style="margin-bottom:20px !important;" name="emne" type="text" class="form-control py-4 mb-4 w-100"
              id="email" placeholder="Hva gjelder det?">
          </div>

          <div class="col-sm-12 p-0">
            <input required style="margin-bottom:20px !important;" type="email" class="form-control py-4 mb-4 w-100" id="email"
              placeholder="Epost">
          </div>

        </div>

        <div class="form-group">
          <textarea required class="form-control w-100" rows="12" name="melding" placeholder="Melding"></textarea>
        </div>

        <!-- <div class="form-check mt-4 mb-2">
          <input type="checkbox" class="form-check-input" id="exampleCheck1">
          <label class="form-check-label" for="exampleCheck1">Motta en kopi av meldingen til eposten din</label>
        </div> -->

        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-12 p-0 w-100">
            <button type="submit" class="pageclip-form__submit--dark-loader 
            pageclip-form__submit btn btn-dark p-3 w-25 mt-3">
              <span>Send melding</span>
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
  export default {
    setup() {
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

      return {}
    }
  }
</script>