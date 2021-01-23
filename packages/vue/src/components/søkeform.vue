<template>
  <div class="s013 m-0 p-0">
    <form class="col-6" v-on:submit.prevent="changeSettings();">
      <div class="inner-form">
        <div style="margin-right: -0px;" class="left rounded">
          <div class="input-wrap first">
            <div class="input-field first">
              <label class="col-10">DEN SOM LETER, HAN FINNER - <i>Matteus 7:7-11</i></label>
              <input
                type="text"
                placeholder="E.g. sommerjobb, vue, design, python, machine learning, haskell"
								aria-label="Search"
								v-bind:value="searchQuery"
								v-on:input="searchQuery = $event.target.value"
                class="col-10"
              />
            </div>
          </div>
          <!-- <div class="input-wrap second">
            <div class="input-field second">
              <label>HVOR</label>
              <input placeholder="E.g. Oslo" type="input" />
              <div class="input-select"></div>
            </div>
          </div> -->
        </div>
        <button
          class="btn-search d-flex justify-content-center align-items-center"
          type="submit"
          style="width:50px;"
        >
          <spinner class="p-0 m-0" style="width:20px; height:20px;" v-if="settings.loading == true"></spinner>
          <svg v-if="settings.loading == false"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="presentation"
            focusable="false"
            style="
              display: block;
              fill: none;
              height: 16px;
              width: 16px;
              stroke: currentcolor;
              stroke-width: 4;
              overflow: visible;
            "
          >
            <g fill="none">
              <path
                d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"
              ></path>
            </g>
          </svg>
        </button>
        
      </div>
    </form>
  </div>
</template>

<script>
  import { searchQuery, axiosMe } from "../views/Stillinger.vue";
  import { settings } from "../settings.js";
  import spinner from "./spinner.vue";

  //Søkefunksjon
	function changeSettings() {
    var søk = searchQuery.value.split(" ").filter(e => e).map(e => e.trim()).join("+");
		settings.value.search = søk;
    settings.value.page = 1;
    axiosMe();
  }
  
  export default{
  setup(){
    
    settings.value.loading = false;
    return{
      changeSettings,
      searchQuery,
      settings,
      spinner,
    }
  }
}

</script>

<style>
html {
  overflow: scroll;
}
.s013 {
  box-shadow: inset 10px 10px 50px 5px black !important;
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;
  background-image: url("../../public/bgbg.png");
  background-size: cover;
  background-position: center center;
  font-family: "Poppins", sans-serif;
}

.s013 form {
  width: 100%;
  max-width: 914px;
  margin: 0;
  z-index: 10000;
}

.s013 form fieldset {
  margin-bottom: 50px;
}

.s013 form fieldset legend {
  font-size: 36px;
  font-weight: bold;
  color: #fff;
  font-family: "Poppins", sans-serif;
  text-align: center;
}

.s013 form .inner-form {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.s013 form .inner-form .left {
  -ms-flex-positive: 1;
  flex-grow: 1;
  display: -ms-flexbox;
  display: flex;
}

.left {
  box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.35);
  border-radius: 40px !important;
}

.input-wrap.first {
  /* border-bottom-left-radius: 40px !important;
  border-top-left-radius: 40px !important; */
  border-radius:40px !important;
}

.input-wrap.second {
  border-bottom-right-radius: 40px !important;
  border-top-right-radius: 40px !important;
}

.s013 form .inner-form .input-wrap {
  background: #fff;
  height: 80px;
  position: relative;
  padding: 20px 25px 20px 25px;
}

.s013 form .inner-form .input-wrap .input-field label {
  font-size: 11px;
  font-weight: 900;
  display: block;
  color: #555;
}

button.btn-search {
  min-width: 50px !important;
  height: 50px !important;
  border-radius: 30px !important;
  transform: scale(1.2);
  margin-left: -65px !important;
  margin-top: 15px !important;
  /* margin-left: -110px !important;
  z-index: 100;
  transform: scale(0.9) !important;
  border-radius: 30px !important;
  font-size: 20px !important; */
}

.btn-search:hover {
  background-color: #ff284f !important;
}

.s013 form .inner-form .input-wrap .input-field input {
  font-size: 16px;
  color: #333;
  background: transparent;
  width: 100%;
  border: 0;
  font-family: "Lato", sans-serif;
  padding: 8px 0;
}

.input-field.first {
  margin-left: 10px;
}

.input-field.secon {
  margin-left: 0px;
}

.s013 form .inner-form .input-wrap .input-field input.placeholder {
  color: #808080;
}

.s013 form .inner-form .input-wrap .input-field input:-moz-placeholder {
  color: #808080;
}

.s013 form .inner-form .input-wrap .input-field input::-webkit-input-placeholder {
  color: #808080;
}

.s013 form .inner-form .input-wrap .input-field input.hover,
.s013 form .inner-form .input-wrap .input-field input:focus {
  box-shadow: none;
  outline: 0;
}

.s013 form .inner-form .input-wrap.first {
  -ms-flex-positive: 1;
  flex-grow: 1;
  border-radius: 3px 0 0 3px;
}

.s013 form .inner-form .input-wrap.second {
  min-width: 262px;
  border-radius: 0 3px 3px 0;
  border-left: 1px solid #e5e5e5;
}

.s013 form .input-select {
  height: 34px;
  padding: 10px 0 6px 0;
}

.s013 form .choices__inner {
  background: transparent;
  border-radius: 0;
  border: 0;
  height: 100%;
  color: #333;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding: 0;
  padding-right: 30px;
  font-size: 16px;
  min-height: auto;
  font-family: "Lato", sans-serif;
}

.s013 form .choices__inner .choices__list.choices__list--single {
  display: -ms-flexbox;
  display: flex;
  padding: 0;
  -ms-flex-align: center;
  align-items: center;
  height: 100%;
}

.s013 form .choices__inner .choices__item.choices__item--selectable.choices__placeholder {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  height: 100%;
  opacity: 1;
  color: #808080;
  font-weight: 400;
}

.s013 form .choices__inner .choices__list--single .choices__item {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  height: 100%;
}

.s013 form .choices__list.choices__list--dropdown {
  border: 0;
  background: #fff;
  padding: 10px 15px;
  margin-top: 10px;
  border-radius: 3px;
}

.s013 form .choices__list.choices__list--dropdown .choices__item--selectable {
  padding-right: 0;
}

.s013 form .choices__list--dropdown .choices__item--selectable.is-highlighted {
  background: transparent;
  color: #333;
}

.s013 form .choices__list--dropdown .choices__item {
  color: #555;
  min-height: 24px;
}

.s013 form .choices[data-type*="select-one"] .choices__inner {
  padding-bottom: 0;
}

.s013 form .choices[data-type*="select-one"]:after {
  border: 0;
  width: 18px;
  height: 18px;
  margin: 0;
  transform: none;
  opacity: 1;
  right: 0;
  top: 0;
  background-size: 18px 18px;
  background-position: right center;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg fill='%23999' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3e%3cpath d='M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
}

.s013 form .choices[data-type*="select-one"].is-open:after {
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg fill='%23999' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3e%3cpath d='M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z'/%3e%3c/svg%3e");
}

.s013 form .btn-search {
  min-width: 110px;
  height: 80px;
  padding: 0 15px;
  background: #ff385c;
  white-space: nowrap;
  border-radius: 3px;
  font-size: 16px;
  color: #fff;
  transition: all 0.2s ease-out, color 0.2s ease-out;
  border: 0;
  cursor: pointer;
  font-weight: 400;
  font-family: "Poppins", sans-serif;
  margin-left: 10px;
}

.s013 form .btn-search:hover {
  background: #ff385c;
}

@media screen and (max-width: 767px) {
  .s013 form .inner-form {
    display: block;
  }

  .s013 form .inner-form .left {
    display: block;
  }

  .s013 form .inner-form .left .input-wrap {
    margin-bottom: 15px;
  }

  .s013 form .btn-search {
    margin: 0;
    width: 100%;
  }
}

/*# sourceMappingURL=Searchs_013.css.map */
</style>
