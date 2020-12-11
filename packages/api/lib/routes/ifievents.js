//Instantiate
var express = require("express");
var router = express.Router();
var data = require("../data/data.json");
var allowedKeys = ["search", "mat", "fullhet", "open", "date", "digitalt"];

//Brukes til å gjøre om amerikanske datoer til europeiske datoer
function switcharoo(a, e1, e2){
    var temp = a[e1];
    a[e1] = a[e2];
    a[e2] = temp;
    return a;
}

//Jobs-route dirigent
router.get("/api/ifievents", function (request, response){
    if(Object.keys(request.query).length == 0) sendAll(request, response);
    else if(Object.keys(request.query).every(e => allowedKeys.includes(e))) searchHandler(request, response);
    else response.send("Ugyldig API-call. Sjekk query-parametrene dine. Feilen har opphav i query-stringen.")
});

//Send all jobs to user
var sendAll = (request, response) => response.send(data.ifievents)

//Search handler
function searchHandler(request, response){
    response.send(JSON.stringify(functions(request, response)));
}

//This function gets called when searching jobs
function functions(request, response){
    var results = data.ifievents;
    for(e of Object.keys(request.query)){
        results = allFunctions[e](request.query[e], results);
    }
    return results;
}

//All functions used in the API
var allFunctions = {
    search(request, result){
        var regex = new RegExp(`${params.join("|")}`, "gi");
        var fullText = "";
        var temp = [];
        result.forEach(e => {
            fullText = e.about.toLowerCase() + e.title.toLowerCase() + e.teaser.toLowerCase();
            fullText = [...new Set(fullText.split(" "))].join(" ");
            if((fullText.match(regex) || []).length > 0){
                temp.push(e);
            } 
        });
        return temp;
    },
    mat(request, result){
        var params = request.toLowerCase();
        return result.filter(event => event.matServering.toString() == params);
    },
    open(request, result){
        var params = request.toLowerCase();
        return result.filter(event => event.open.toString() == params)
    },
    fullhet(request, result){
        var params = request.toLowerCase();
        return result.filter(event => event.fullhet.toString() == params)
    },
    date(request, result){
        var temp = [];
        var params = request;
        var chosenDate = undefined;
        var type = undefined;
        var fraDato = undefined;
        var tilDato = undefined;
        var dates = undefined;
        var date = undefined;
        var differanse = undefined;

        if(/\s/gi.test(params)) return "Datoen skal ikke ha mellomrom (dvs. '+'-tegnet) i queryen.";

        if(params.split("-").length == 1){
            params = switcharoo(request.split("/"), 0, 1).join("/");
            chosenDate = new Date(params);
            type = "given";
        }
        else if(params.split("-").length == 2) {
            type = "mellom";
            dates = params.split("-");
            fraDato = new Date(switcharoo(dates[0].split("/"), 0, 1).join("/"));
            tilDato = new Date(switcharoo(dates[1].split("/"), 0, 1).join("/"));
        }
        else return "Det er kun mulig å ha 1 dato eller 2 datoer som query-parameter. Dvs: ?date=01/01/2020 eller ?date=01/01/2020-02/01/2020";

        result.forEach(e => {
            date = new Date(e.americanDate);
            if(type == "given"){
                differanse = (date - chosenDate) / 86400000;
                if(differanse <= 1) temp.push(e);
            }
            else if(type == "mellom"){
                if(fraDato.getTime() <= date.getTime() && date.getTime() <= tilDato.getTime()){
                    temp.push(e);
                }
            }
        });
        return temp;
    },
    digitalt(request, result){
        if(request == "true") return result.filter(e => e.plass.toLowerCase() == "digitalt");
        else if(request == "false") return result.filter(e => e.plass != "digitalt");
    }
}

//Export it
module.exports = router;