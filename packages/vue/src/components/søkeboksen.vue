<template>
    <form v-on:submit.prevent="submitSearch();" class="row d-flex justify-content-center" style="max-width:500px; min-width:100%;">
        <div class="form-group col-12 col-sm-10 col-md-12 col-lg-11 col-xl-11 justify-content-center align-items-center" style="margin-top: 10px;margin-bottom: 10px;">
            <div class="d-flex align-items-center justify-content-center" style="background: white;border-radius: 51px;padding: 0px;padding-right: 0px;padding-left: 25px;padding-bottom: 5px;padding-top: 5px;box-shadow: 0px 0px 5px 3px rgb(0 0 0 / 15%);width: 100%;height: 65px;">
                <input ref="searchInput" v-model="searchQuery" v-on:input="search(); $event.target.composing = false" class="form-control-sm d-lg-flex" type="text" style="z-index: 1;border-radius: 48px;border-top-left-radius: 48;border-bottom-right-radius: 0;border-bottom-left-radius: 48px;border-top-right-radius: 0;border-style: none;border-color: var(--red);border-top-width: 0px;border-right-style: none;height: 48px;background: #ffffff;color: #000000;padding-left: 10px;width: 100%;margin-left: 4px;" placeholder="F.eks. sommerjobb java">
                <button @click="submitSearch();" class="submit btn btn-outline-light btn-lg text-nowrap d-flex justify-content-center align-items-center justify-content-xl-center align-items-xl-center hovedsideSøkKnapp" type="button" style="border-radius: 53px;z-index: 1;background: #ff385c;font-weight: 100;margin-right: 7px;height: 55px;width: 55px;min-height: 55px;margin-left: 14px;min-width: 55px;display: flex;justify-content: center;color: white;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icon-tabler-search">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <circle cx="10" cy="10" r="7"></circle>
                        <line x1="21" y1="21" x2="15" y2="15"></line>
                    </svg>
                </button>
            </div>
        </div>

        <div v-if="searchQuery" style="top: inherit;left: inherit; margin-top: 80px !important; box-shadow: rgb(0 0 0 / 15%) 0px 0px 5px 3px; max-width:400px;" class="søkeTreffBoks m-0 p-0 dropdown-menu w-auto border-0 show" aria-labelledby="dropdownMenuButton">
            <div style = "border-top: none !important;" v-for="hit in results" class="card m-1 p-0">
                <div style="max-height:100px !important; min-height:100px !important; height: 100px !important;" class="row no-gutters">
                    <div style="max-height:100px;" class="col-4 d-flex justify-content-center align-items-center p-3">
                        <img style="max-height:65px; transform:scale(1);" :src="hit.companyImage" class="card-img" alt="...">
                    </div>
                    <div class="col-8 d-flex align-items-center">
                        <div style="word-wrap: break-word;white-space: pre-wrap; word-break: break-word;" class="card-bod pl-2 pr-3">
                            <a href="#">
                                <h5 style="font-size: 16px;" class="m-0 card-title">{{ hit.title }}</h5>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>

<script>
    //Importer greier
    import { axiosMe } from "../views/Stillinger.vue";
    import { settings } from "../settings.js";
    import spinner from "./spinner.vue";
    import { ref, onMounted } from "vue";
    import * as algoliasearch from 'algoliasearch';
    import søkeIndex from "../../../algolia/algoliaconfig.js";
    import router from "../router/index.js";

    //Reffer
    var searchQuery = ref("");
    var results = ref([]);
    var searchInput = ref(null);

    //Search function
    async function search(str) {
        console.log(str);
        results.value = await søkeIndex.search(
            searchQuery.value, {
                hitsPerPage: 3
            }
        )
        console.log(results.value);
        results.value = results.value.hits;
        console.log(results.value);
    }

    function submitSearch(){
        console.log(searchQuery.value);
        if(searchQuery.value != ""){
            router.push({
                path: "stillinger",
                query: {
                    "search": searchQuery.value,
                }
            });
        }
        else router.push("stillinger");
    }

    export default {
        setup() {
            onMounted(() => {
                searchInput.value.focus();
            })
            return {
                spinner,
                searchQuery,
                results,
                search,
                submitSearch,
                searchInput,
            }
        }
    }
</script>