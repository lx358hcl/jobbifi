<template>
    <form class="col-6 d-flex justify-content-center" v-on:submit.prevent="changeSettings();">

        <div class="inner-form">
            <!-- Skriveområdet -->
            <div style="margin-right: -0px;" class="left rounded">
                <div class="input-wrap first" for="søking">
                    <div class="input-field first">
                        <label for="søking" class="col-10">DEN SOM LETER, HAN FINNER - <i>Matteus 7:7-11</i></label>
                        <input id="søking" type="text" placeholder="E.g. sommerjobb, vue, design, python, machine learning, haskell" aria-label="Search" v-on:input="searchQuery = $event.target.value" class="col-10" />
                    </div>
                </div>
            </div>

            <!-- Søk knappen-->
            <button class="btn-search d-flex justify-content-center align-items-center" type="submit">
                <spinner class="p-0 m-0" style="width:20px; height:20px;" v-if="settings.loading == true" />
                <svg v-if="settings.loading == false" id="søkeIkon"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="presentation"
                    focusable="false">                       
                    <g fill="none">
                        <path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path>
                    </g>
                </svg>
            </button>
        </div>
        
    </form>
</template>

<script>
    import { searchQuery, axiosMe } from "../views/Stillinger.vue";
    import { settings } from "../settings.js";
    import spinner from "./spinner.vue";
    import { ref } from "vue";

    function changeSettings() {
        var søk = searchQuery.value.split(" ").filter(e => e).map(e => e.trim()).join("+");
        settings.value.search = søk;
        settings.value.page = 1;
        axiosMe();
    }

    export default {
        setup() {
            settings.value.loading = false;
            return {
                changeSettings,
                searchQuery,
                settings,
                spinner,
            }
        }
    }
</script>