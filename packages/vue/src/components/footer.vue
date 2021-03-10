<template>
  <footer>
    <div class="container-xl">
      <ul class="footer d-flex align-items-center justify-content-around">
        <li class="footerElement d-flex align-items-center">
            <span>© UTVIKLET AV&nbsp; </span>
            <a class="devCredit logRegGreier" href="https://github.com/igormomc">SKJØNNHETEN&nbsp; </a> OG&nbsp;
            <a class="devCredit logRegGreier" href="https://github.com/lukamo1996">UDYRET</a>
        </li>
        <li class="footerElement d-flex align-items-center">
          <router-link to="/retningslinjer" class="footerElement logRegGreier">
            15m 30s
          </router-link>
        </li>
        <li class="footerElement d-flex align-items-center">
          <router-link to="/kontakt" class="footerElement logRegGreier">
            KONTAKT
          </router-link>
          ||
          <router-link to="/retningslinjer" class="footerElement logRegGreier">
            RETNINGSLINJER
          </router-link>
          ||
          <router-link to="/api" class="footerElement logRegGreier">API</router-link>
        </li>
      </ul>
    </div>
  </footer>
</template>
