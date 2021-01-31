<template>
  <footer>
<<<<<<< HEAD
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
=======
    <div class="container">
      <ul class="footer">
        <div class="leftBlock">
          <li class="ceo">© UTVIKLET AV <a class="devCredit" href="https://github.com/igormomc">SKJØNNHETEN</a> OG <a class="devCredit" href="https://github.com/lukamo1996">UDYRET</a></li>
        </div>
        <div class="rightBlock">
          <router-link
            to="/kontakt"
            class="contak"
            v-bind:class="{ active: $route.path == '/kontakt' }"
            >KONTAKT</router-link
          >
          ||
          <router-link
            to="/retningslinjer"
            class="contak"
            v-bind:class="{ active: $route.path == '/retningslinjer' }"
            >RETNINGSLINJER</router-link
          >
          ||
          <router-link to="/api" class="contak" v-bind:class="{ active: $route.path == '/api' }"
            >API</router-link
          >
>>>>>>> cd212d7ffbb92ecee196d5f29f80185a3347af93
        </div>
      </ul>
    </div>
  </footer>
</template>
