<template>
  <main class="container center">
    <div class="row beholder center">
      <div class="col-12">
        <h2>
          <strong style="font-family: 'Goudy Bookletter 1911', serif !important">
            Om Jobbifi
          </strong>
        </h2>
        <hr>
        <p>
          Jobbifi er en nettside som prøver å gjøre jobbsøkingsprosessen litt enklere for informatikk- og designstudenter. Ved å redusere antallet tilgjengelige jobbsøkingssider til et minimum så vil graden av <a href="https://www.sciencedirect.com/topics/psychology/ego-depletion">ego-depletion</a>        bli lavere og produktivitet vil dermed helhetsmessig øke.
        </p>
        <hr>
        <p>
          <strong>
            Hva aggregerer og hvor ofte aggregerer Jobbifi jobbsider?
          </strong>
        </p>
        <p>
          Per dags dato <i>(12.01.2021)</i> så crawler jobbifi nettsidene nedenfor hver dag kl. 15:00.
        </p>
        <ul>
          <li><i>finn.no</i></li>
          <li><i>arbeidsplassen.no</i></li>
          <li><i>ifinavnet.no</i></li>
        </ul>
        <p>
          Det er mulig vi inkluderer webcruiter og andre liknende sider, men vi får se.
        </p>
        <hr>
        <p>
          <strong>Kontakt</strong>
        </p>
        <p>Har du spørsmål? Bruk "Kontakt"-siden :)</p>
        <hr>
        <p class="m-0 mb-2 pb-2">
          Skjønnheten og Udyret
        </p>
      </div>
    </div>
  </main>
</template>

<script>
  import { onMounted, onUpdated } from "vue";
  export default{
    setup(){
      onMounted(() => {
        window.scrollTo(0, 0);
      })
      onUpdated(() => {
        window.scrollTo(0, 0);
      })
      return{

      }
    }
  }

</script>