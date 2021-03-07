<template>
  <footer>
    <div class="container-xl">
      <ul class="footer d-flex align-items-center justify-content-around">
        <li class="footerElement d-flex align-items-center">
          <p class="p-0 m-0 utvikletAv">
            &nbsp; © UTVIKLET AV
            <a class="devCredit" href="https://github.com/igormomc">SKJØNNHETEN</a> OG
            <a class="devCredit" href="https://github.com/lukamo1996">UDYRET</a>
          </p>
        </li>
        <li class="footerElement d-flex align-items-center">
          <router-link to="/retningslinjer" class="footerElement">
            &nbsp; 15m 30s
          </router-link>
        </li>
        <li class="footerElement d-flex align-items-center">
          <router-link to="/kontakt" class="footerElement">
            &nbsp; KONTAKT
          </router-link>
          ||
          <router-link to="/retningslinjer" class="footerElement">
            RETNINGSLINJER
          </router-link>
          ||
          <router-link to="/api" class="footerElement">API&nbsp; </router-link>
        </li>
      </ul>
    </div>
  </footer>
</template>
