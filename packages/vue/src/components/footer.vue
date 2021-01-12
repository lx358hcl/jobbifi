<template>
  <footer>
    <div class="container">
      <ul class="footer">
        <div class="leftBlock">
          <li class="ceo">© UTVIKLET AV SKJØNNHETEN OG UDYRET</li>
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
        </div>
      </ul>
    </div>
  </footer>
</template>
