<template>
  <footer>
      <div class="container">
        <ul class = "footer">
          <div class = "leftBlock">
            <li class="ceo">© IGOR & LUKA MOMCILOVIC 2020</li>
          </div>
          <div class = "rightBlock">
            <a href="/kontakt" class="contak" v-bind:class="{'active': $route.path == '/kontakt'}">KONTAKT</a> ||
            <a href="/retningslinjer" class="contak" v-bind:class="{'active': $route.path == '/retningslinjer'}">RETNINGSLINJER</a> ||
            <a href="/api" class="contak" v-bind:class="{'active': $route.path == '/api'}">API</a>
          </div>
        </ul>
      </div>
  </footer>
</template>