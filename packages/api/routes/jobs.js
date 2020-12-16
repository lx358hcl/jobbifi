//Instantiate
var express = require("express");
var router = express.Router();
var data = require("../data/data.json");
var allowedKeys = ["search", "tekno", "type", "frist", "sort"];

//Jobs-route dirigent
router.get("/api/jobs", function (request, response){
    if(Object.keys(request.query).length == 0) sendAll(request, response);
    else if(Object.keys(request.query).every(e => allowedKeys.includes(e))) searchHandler(request, response);
    else response.send("Ugyldig API-call. Sjekk query-parametrene dine. Feilen har opphav i query-stringen.")
});

//Send all jobs to user
var sendAll = (request, response) => response.send(data.jobs)

//Search handler
function searchHandler(request, response){
    response.send(JSON.stringify(functions(request, response)));
}

//This function gets called when searching jobs
function functions(request, response){
    var results = data.jobs;
    for(e of Object.keys(request.query)){
        results = allFunctions[e](request.query[e], results);
    }
    return results;
}

//All functions used in the API
var allFunctions = {
    search(request, result){
        var params = request.toLowerCase().split(" ");
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
    type(request, result){
        var params = request.toLowerCase().split(" ");
        return result.filter(job => params.some(jobType => jobType == job.position));
    },
    tekno(request, result){
        var params = request.toLowerCase().split(" ");
        return result.filter(job => job.teknologier.some(teknologi => params.includes(teknologi)));
    },
    frist(request, result){
        var params =  Number(request) * 86400000;
        var currentDate = new Date();
        var date = undefined;
        var differanse = undefined;
        var temp = [];
        result.forEach(e => {
            date = new Date(e.dateType);
            differanse = (date - currentDate) / 86400000;
            if(differanse < params) temp.push(e);
        });
        return temp;
    },
    sort(request, result){
        if(request == "down"){
            return result.sort((a, b) => {
                var [dag1, måned1, år1] = a.date.split(".");
                var [dag2, måned2, år2] = b.date.split(".");
                var dato1 = parseInt(`${år1}${måned1}${dag1}`);
                var dato2 = parseInt(`${år2}${måned2}${dag2}`);
                if(dato1 < dato2) return 1;
                else if(dato1 > dato2) return -1;
                else return 0;
            });
        }
        else if(request == "up"){
            return result.sort((a, b) => {
                var [dag1, måned1, år1] = a.date.split(".");
                var [dag2, måned2, år2] = b.date.split(".");
                var dato1 = parseInt(`${år1}${måned1}${dag1}`);
                var dato2 = parseInt(`${år2}${måned2}${dag2}`);
                if(dato1 > dato2) return 1;
                else if(dato1 < dato2) return -1;
                else return 0;
            });
        }
        else{
            return "Den sorteringsmekanismen der finnes ikke.";
        }
    }
}

//Export it
module.exports = router;