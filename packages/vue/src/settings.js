//Settingsvariabel
import { ref } from "vue";

var settings = ref({
    "type": ["fulltid", "deltid", "internship"],
    "search": "",
    "tekno": [],
    "frist": "",
    "sort": "down",
});

export { settings };