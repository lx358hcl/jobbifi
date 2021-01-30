<template>
  <main class="homepage container">

    <body class="stackedit">
      <div class="stackedit__html">
        <br>
        <h2 class="boldyh2">API for <a href="http://localhost:8080/">NEVET</a></h2>
        <hr>
        <h3 id="entry-pointsene-for-api-en">Entry-pointsene for API-en:</h3>
        <hr>
        <pre><code>/api/ifievents
/api/jobs
/api/tekna
</code></pre>
        <p>|⇒ Direkte bruk av disse vil returnere alle lagrede elementer for dets gitte kategori.</p>
        <p
          id="det-er-også-mulig-å-utføre-mer-spesifikke-søk-av-de-indekserte-elementene-ved-å-ta-i-bruk-følgende-paramtere">
          Det er også mulig å utføre mer spesifikke søk av de indekserte elementene ved å ta i bruk følgende paramtere:
        </p>
        <hr>
        <h3 id="for-jobber">For jobber:</h3>
        <pre><code>/api/jobs?...
</code></pre>
        <ul>
          <li><strong><em>search</em></strong> (ord som visma, knowit etc. tilstede i beskrivelsen, tittel osv.)
            <ul>
              <li><em>Eksempel</em>: <code>/api/jobs?search=react</code></li>
              <li><em>Eksempel</em>: <code>/api/jobs?search=python+ux+linux</code>
                <ul>
                  <li>Dette er det samme som search=python OR ux OR linux som for de som er kjent med MeSH-uttrykk.</li>
                </ul>
              </li>
            </ul>
          </li>
          <li><strong><em>frist</em></strong> (antall dager til søkefristen utløper)
            <ul>
              <li><em>Eksempel</em>: <code>/api/jobs?frist=3</code>
                <ul>
                  <li>Dette returnerer alle jobber der fristen utløper om 3 dager. Frist=0 vil si at fristen er i dag.
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li><strong><em>tekno</em></strong> (enkelte jobber har teknologier assosiert med seg, disse kan spesifiseres,
            men
            denne kan gå glipp av enkelte jobber, så ved robust jobbsøking burde <strong><em>search</em></strong> brukes
            <ul>
              <li><em>Eksempel</em>: <code>/api/jobs?tekno=react</code></li>
            </ul>
          </li>
          <li><strong><em>type</em></strong> (deltidsjobb, fulltidsjobb, internship)
            <ul>
              <li><em>Eksempel</em>: <code>/api/jobs?type=deltid</code></li>
              <li><em>Eksempel</em>: <code>/api/jobs?type=deltid+fulltid</code></li>
            </ul>
          </li>
        </ul>
        <p>Disse parametrene kan også kombineres på forskjellige måter, så det har ingenting å si om
          <strong><em>search</em></strong> kommer først eller sist osv. Eksempler på dette her:</p>
        <h4 id="kombinasjonsuttrykk"><strong><em>Kombinasjonsuttrykk</em></strong>:</h4>
        <ul>
          <li><code>/api/jobs?type=fulltid&amp;tekno=react&amp;frist=7&amp;search=javascript</code>
            <ul>
              <li>Her søker vi altså etter alle jobber som er indeksert i databasen som fulltidsjobber, der
                søknadsfristen
                utløper om 7 dager, der stillingen ønsker at søkeren skal ha ferdigheter med react og at søknaden nevner
                ordet javascript.</li>
            </ul>
          </li>
        </ul>
        <hr>
        <h3 id="for-ifi-arrangementer">For Ifi-arrangementer</h3>
        <p><code>/api/ifievents?...</code></p>
        <ul>
          <li><strong><em>search</em></strong>: Vanlig ordsøk som ovenfor.
            <ul>
              <li>Eksempel: <code>/api/ifievents?search=knowit</code></li>
            </ul>
          </li>
          <li><strong><em>mat</em></strong>: Serveres mat?
            <ul>
              <li>Eksempel: <code>/api/ifievents?mat=true</code></li>
            </ul>
          </li>
          <li><strong><em>fullhet</em></strong>: Er arrangementet fullt?
            <ul>
              <li>Eksempel: <code>/api/ifievents?fullhet=false</code></li>
            </ul>
          </li>
          <li><strong><em>open</em></strong>: Er arrangementet åpent?
            <ul>
              <li>Eksempel: <code>/api/ifievents?open=true</code></li>
            </ul>
          </li>
          <li><strong><em>date</em></strong>:
            <ul>
              <li>Eksempel: <code>/api/ifievents?date=01/01/2020</code>
                <ul>
                  <li>Dette vil si, returner alle arrangementer som forekommer 1. januar 2020.</li>
                </ul>
              </li>
              <li>Eksempel: <code>/api/ifievents?date=01/01/2020-05/01/2020</code>
                <ul>
                  <li>Dette vil si, returner alle arrangementer som forekommer mellom 1. januar 2020 og 5. januar 2020.
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li><strong><em>digitalt</em></strong>: Er arrangementet fysisk eller digitalt?
            <ul>
              <li>Eksempel: <code>/api/ifievents?digitalt=false</code>
                <ul>
                  <li>Vis meg bare fysiske arrangementer</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
        <h4 id="kombinasjonsuttryk"><strong><em>Kombinasjonsuttryk</em></strong>:</h4>
        <ul>
          <li><code>/api/ifievents?mat=true&amp;open=true&amp;fullhet=false</code>
            <ul>
              <li>Returner alle arrangementer som serverer mat, er åpne og ikke er fulle.</li>
            </ul>
          </li>
        </ul>
        <hr>
        <h3 id="for-tekna">For Tekna</h3>
        <h3 id="alle-responser-fra-api-en-blir-returnert-i--json-format.">Alle responser fra API-en blir returnert i
          <strong><em>JSON</em></strong>-format.</h3>
        <hr>
      </div>
      <br>
      <br>
      <br>
      <br>
    </body>
  </main>
</template>

<script>
  export default {
    setup() {
      return {

      }

    }
  }
</script>