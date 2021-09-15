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
  import emailjs from 'emailjs-com';
  emailjs.init("user_vU0ggARxWces5A4Fc7z00");

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
        document.querySelector(".kontaktSkjema").innerHTML = "<p>Din melding har blitt mottatt og en kopi har blitt sendt til din epost. </p>";
          var templateParams = {
            navn: navn.value,
            emne: emne.value,
            senderEpost: senderEpost.value,
            melding: melding.value,
          };
          emailjs.send("service_99wwis5","template_9m7qrpx", templateParams);
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