//Importer watchern og ref
import { watch, ref } from "vue";

//Settings
var settings = ref({
    "type": ["fulltid", "deltid", "annet"],
    "search": "",
    "tekno": [],
    "frist": "9000",
    "ingenUtløpte": false,
    "sortFrist":"",
    "rare": true,
    "sort": "down",
    "page": 1,
    "limit": "20",
    "loading": true,
    "data": "",
    "entireResponse": "",
    "source": ["ifijobs", "arbeidsplassen", "finn"],
});

//Last inn fra localStorage
var fraLocalStorage = localStorage.getItem("ifijobbSettings");

if(fraLocalStorage) settings.value = JSON.parse(fraLocalStorage);
else localStorage.setItem("ifijobbSettings", JSON.stringify(settings.value));

//Lagr settingsene i settings i localStorage
var lagreEndringer = () => {
    // localStorage.setItem("ifijobbSettings", JSON.stringify(settings.value));
    console.log(settings.value)
}

//Lytt etter endringer i settings
watch(settings, lagreEndringer, { deep: true });

//Export them
export { settings };