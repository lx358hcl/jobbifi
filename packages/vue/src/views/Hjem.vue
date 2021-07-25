<template style>
  <main style = "min-height:100vh;" >
        <section class="p-2 d-flex justify-content-center align-items-center align-content-center" style="background: url(&quot;assets/img/briller.jpg&quot;); background-position: center; background-size: cover; background-repeat: no-repeat; border-style: none;border-color: rgb(9,162,255);color: rgba(33,37,41,0);min-height: inherit;font-family: Spectral, serif;font-size: 30px;/*display: flex;*//*justify-content: center;*/">
            <div class="d-flex justify-content-center mt-0" style="padding: 0px;padding-left: 0;padding-right: 0;z-index: 2;">
                <div class="container d-flex flex-column justify-content-center align-items-center align-items-xl-center">
                    <div class="row">
                        <div class="col">
                            <h2 style="color: rgb(0,0,0);font-weight: bold;font-family: Spectral, serif;margin-bottom: 0px;text-align: center;">
                              <strong style="color: black; font-size:30px; font-weight: 900;border-bottom-color: #212529;">Jobbifi</strong>
                              <span style="border-bottom-color: #212529;text-shadow: 0px 0px;color: black;font-weight: 300;">&nbsp;| For informatikere
                              </span>
                            </h2>
                        </div>
                    </div>
                    <div style = "width:100%;" class="py-3 row flex-column d-flex align-items-center">
                        <div class="col d-flex justify-content-center" style="margin: 10px;margin-top: 20px;margin-bottom: 20px;margin-right: 0px;margin-left: 0px;">
                            <p class = "d-flex align-items-center" style="color: rgb(0,0,0);font-size: 16px;font-weight: 300;margin: 0px;margin-bottom: 0px;text-align: center;">
                              <typeWriter class = "px-4" />
                            </p>
                        </div>
                    </div>

                    <!--Søkeboksen-->
                    <søkeboksen style = "transform:scale(1.0);"></søkeboksen>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
  import router from "../router/index.js";
  import typeWriter from "../components/typeWriter.vue";
  import søkeboksen from "../components/søkeboksen.vue";
  import algoliasearch from 'algoliasearch';
  import søkeIndex from "../../../algolia/algoliaconfig.js";

  export default {
    setup() {
      return {
        typeWriter,
        søkeboksen
      }
    },
  }
</script>