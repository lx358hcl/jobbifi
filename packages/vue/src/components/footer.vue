<template>
  <footer>
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
            >API</router-link>
        </div>
      </ul>
    </div>
  </footer>
</template>
