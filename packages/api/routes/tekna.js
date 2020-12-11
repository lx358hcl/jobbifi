//Instantiate
var express = require("express");
var router = express.Router();
var data = require("../data/data.json");
var allowedKeys = ["kurstype", "search", "status", "fagtype", "plass", "date"];

//Brukes til å gjøre om amerikanske datoer til europeiske datoer
function switcharoo(a, e1, e2) {
    var temp = a[e1];
    a[e1] = a[e2];
    a[e2] = temp;
    return a;
}

//Jobs-route dirigent
router.get("/api/tekna", function (request, response) {
    if (Object.keys(request.query).length == 0) sendAll(request, response);
    else if (Object.keys(request.query).every(e => allowedKeys.includes(e))) searchHandler(request, response);
    else response.send("Ugyldig API-call. Sjekk query-parametrene dine. Feilen har opphav i query-stringen.")
});

//Send all jobs to user
var sendAll = (request, response) => response.send(data.tekna)

//Search handler
function searchHandler(request, response) {
    response.send(JSON.stringify(functions(request, response)));
}

//This function gets called when searching jobs
function functions(request, response) {
    var results = data.tekna;
    for (e of Object.keys(request.query)) {
        results = allFunctions[e](request.query[e], results);
    }
    return results;
}

//All functions used in the API
var allFunctions = {
    search(request, result) {
        var params = request.split(" ");
        var regex = new RegExp(`${params.join("|")}`, "gi");
        var fullText = "";
        var temp = [];
        result.forEach(e => {
            fullText = e.description.toLowerCase() + e.heading.toLowerCase();
            fullText = [...new Set(fullText.split(" "))].join(" ");
            if ((fullText.match(regex) || []).length > 0) {
                temp.push(e);
            }
        });
        return temp;
    },
    kurstype(request, result) {
        var params = request.toLowerCase().split(" ");
        return result.filter(e => {
            if(e.kursType){
                if(params.includes(e.kursType.toLowerCase())) return e;
            }
        });
    },
    fagtype(request, result) {
        var fagTyper = {
            "Bygg, anlegg og eiendom": "bygg",
            "Energi og klima": "energi",
            "Forskning og innovasjon": "forsking",
            "Industri": "industri",
            "IT og tele": "it",
            "IT-verktøy": "ver",
            "Ledelse og utvikling": "ledut",
            "Maritim teknologi": "maritim",
            "Miljø- og biovitenskap": "miljo",
            "Olje og gass": "olje",
            "Realfag og utdanning": "realfag",
            "Samferdsel, infrastruktur og areal": "samf"
        }
        var params = request.toLowerCase().split(" ");
        return result.filter(e => {
            if(e.fagType){
                if(params.includes(fagTyper[e.fagType])) return e;
            };
        });
    },
    status(request, result){
        var params = request;
        return result.filter(e => e.status.toString() == params);
    },
    plass(request, result){
        var params = request.toLowerCase().split(" ");
        return result.filter(e => {
            var plass = e.placeName.split(",").map(e => e.trim().toLowerCase());
            var siste = plass[plass.length - 1];
            if(params.includes(siste)) return e;
        });
    },
    date(request, result){
        var temp = [];
        var params = request.split("-");
        var førDate = new Date(switcharoo(params[0].split("/"), 0, 1));
        var etterDate = params[1] ? new Date(switcharoo(params[1], 0, 1)) : undefined;
        var date = undefined
        var state = !!førDate.getTime() && etterDate ? "mellom" : "given";
        if(state == "given"){
            result.forEach(e => {
                date = new Date(switcharoo(e.riktigDato.split("."), 0, 1));
                console.log(e);
                console.log("hello")
                if(date.getTime() == førDate.getTime()){
                    temp.push(e);
                }
            });
        }
        else{
            result.forEach(e => {
                date = new Date(switcharoo(e.riktigDato.split("."), 0, 1)).getTime();
                if(førDate.getTime() <= date && date <= etterDate.getTime()){
                    temp.push(e);
                }
            });
        }
        return temp;
    }
}

//Export it
module.exports = router;