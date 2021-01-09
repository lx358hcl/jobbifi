//Importer watchern og ref
import { watch, ref } from "vue";

//Settings
var settings = ref({
    "type": ["fulltid", "deltid", "annet"],
    "search": "",
    "tekno": [],
    "frist": "",
    "sort": "down",
    "page": 1,
    "limit": "100",
    "loading": true,
    "data": "",
    "entireResponse": "",
});

//Last inn fra localStorage
var fraLocalStorage = localStorage.getItem("ifijobbSettings");
if(fraLocalStorage){
    settings.value = JSON.parse(fraLocalStorage);
}
else{
    localStorage.setItem("ifijobbSettings", JSON.stringify(settings.value));
}

//Når en endring i settingen ovenfor skjer
var lagreEndringer = () => {
    localStorage.setItem("ifijobbSettings", JSON.stringify(settings.value));
    console.log(settings.value)
}

//Lytt etter endringer i settings
watch(settings, lagreEndringer, { deep: true });

export { settings };