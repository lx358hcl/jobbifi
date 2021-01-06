//Settingsvariabel
import { ref } from "vue";

var settings = ref({
    "type": ["fulltid", "deltid", "annet"],
    "search": "",
    "tekno": [],
    "frist": "",
    "sort": "down",
    "page": 1,
});

export { settings };