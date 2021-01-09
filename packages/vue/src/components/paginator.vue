<template>

  <!-- Til Høyre-->
  <i @click="forrige();" style="font-size:30px;" class="bi gjørTilClickable bi-chevron-left"></i>

  <!-- Paginator Elementet-->
  <input style="width:100px;
  padding:10px;
  margin:10px;
  height:auto;
  font-size:30px;" type = "input" :value="page"> 

  <span style ="font-size:30px;">/</span> 

  <input style="width:100px;
  padding:10px;
  margin:10px;
  height:auto;
  font-size:30px;" type = "input" :value="totalt ? totalt : '...'">

  <!-- Til Venstre -->
  <i @click="neste();" style="font-size:30px;" class="bi gjørTilClickable bi-chevron-right"></i>

</template>

<script>
var axios = require("axios");
import { settings } from "../settings.js";
import { axiosMe } from "../views/Stillinger.vue";

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

function neste(){
  if(settings.value.page == props.totalt) return null;
  settings.value.page = settings.value.page + 1;
  axiosMe();
}
function forrige(){
  if(settings.value.page == 1) return null;
  settings.value.page = settings.value.page - 1;
  axiosMe();
}

    return{
      neste,
      forrige,
    }
  }
}

</script>