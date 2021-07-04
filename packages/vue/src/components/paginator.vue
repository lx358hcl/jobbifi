<template>
  <div class="row d-flex flex-row justify-content-center align-items-center align-content-center">
    <div class="col d-flex justify-content-center align-items-center align-content-center" style="font-size: 18px;margin-bottom: 9px; margin-top:9px;">
      <div></div>
      <div class="list-group list-group-horizontal"><a class="list-group-item list-group-item-action d-flex justify-content-center align-items-center" tabindex="0" target="_parent"><span></span><i class="fa fa-chevron-left"></i></a>
        <a class="list-group-item list-group-item-action disabled d-flex justify-content-center align-items-center">
          <p style="margin-bottom: 0px;">{{ page + 1 }}</p><span></span>
        </a>
        <a class="list-group-item list-group-item-action disabled d-flex justify-content-center align-items-center">
          <p style="margin-bottom: 0px;">av</p><span></span>
        </a>
        <a class="list-group-item list-group-item-action disabled d-flex justify-content-center align-items-center">
          <p style="margin-bottom: 0px;">{{ totalPages }}</p><span></span>
        </a><a class="list-group-item list-group-item-action d-flex justify-content-center align-items-center"><span></span><i class="fa fa-chevron-right"></i></a></div>
    </div>
  </div>
</template>

<script>
export default{
  props:{
    page: String,
    totalPages: String,
  },
  setup() {
    return{
      
    }
  }
}

</script>