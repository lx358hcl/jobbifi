<template>
  <footer>
    <div class="container-xl">
      <ul class="footer d-flex align-items-center justify-content-around">
        <div class="leftBlock">
          <li class="ceo d-flex align-items-center">
            <p class = "leftBlockText">
              © UTVIKLET AV 
              <a class="devCredit" href="https://github.com/igormomc">SKJØNNHETEN</a> 
              OG 
              <a class="devCredit" href="https://github.com/lukamo1996">UDYRET</a>
            </p>
          </li>
        </div>
        <div class="rightBlock">
          <router-link to="/kontakt" class="contak">
            KONTAKT
          </router-link>
          ||
          <router-link to="/retningslinjer" class="contak">
            RETNINGSLINJER
          </router-link>
          ||
          <router-link to="/api" class="contak">API</router-link>
        </div>
      </ul>
    </div>
  </footer>
</template>
