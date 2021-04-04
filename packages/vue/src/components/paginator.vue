<template>
  <div class = "d-flex justify-content-center">
    <div style class = "d-flex justify-content-center align-items-center">
      <!-- Til Venstre-->
      <div @click="forrige();" class = "venstre paginatorBoks gjørTilClickable">
        <i style="font-size:30px;" class="bi gjørTilClickable bi-chevron-left"></i>
      </div>
      
      <!-- Paginator Elementet-->
      <div class = "paginatorBoks">
        <div class = "paginatorBoks border-0">{{ page }}</div>
      </div>
      

      <!--Av-->
      <div class = "paginatorBoks">
        <p style ="font-size:24px;"> av </p>
      </div>

      <!--Høyre -->
      <div class = "paginatorBoks">
        <div class = "paginatorBoks border-0">{{ totalt ? totalt : "..." }}</div>
      </div>

      <!-- Til Høyre -->
      <div @click="neste();" class = "høyre paginatorBoks gjørTilClickable">
        <i style="font-size:30px;" class="bi gjørTilClickable bi-chevron-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
var axios = require("axios");
import { settings } from "../settings.js";
import { axiosMe } from "../views/Stillinger.vue";
import spinner from "../components/spinner.vue";

export default {
  props: {
  	totalt: {
      type: Number,
  	},
    page:{
      type: Number,
    }
  },
setup(props){
  console.log(settings.value);
  async function neste(){
    if(!props.totalt) return null;
    else if(settings.value.page == props.totalt) return null;
    settings.value.page = settings.value.page + 1;
    await axiosMe();
  }
  async function forrige(){
    if(!props.totalt) return null;
    else if(settings.value.page == 1) return null;
    settings.value.page = settings.value.page - 1;
    await axiosMe();
  }
    return{
      neste,
      forrige,
      settings,
      spinner,
    }
  }
}

</script>