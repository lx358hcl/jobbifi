//Instantiate
var express = require("express");
var router = express.Router();
var data = require("../data/data.json");
var allowedKeys = ["search", "tekno", "type", "frist", "sortDate", "rare", "sortFrist", "id", "limit", "page"];
//Jobs-route dirigent
router.get("/api/jobs", function (request, response){
    if(Object.keys(request.query).length == 0) sendAll(request, response);
    else if(Object.keys(request.query).every(e => allowedKeys.includes(e))) searchHandler(request, response);
    else response.send("Ugyldig API-call. Sjekk query-parametrene dine. Feilen har opphav i query-stringen.")
});

//Send all jobs to user
var sendAll = (request, response) => response.send(data.jobs)

//Search handler
var searchHandler = (request, response) => response.send(functions(request, response));

//This function gets called when searching jobs
function functions(request, response){
    var limit = request.query.limit;
    var page = request.query.page;
    var antall = {};
    var results = {
        "data": data.jobs,
        "info": {
            "antall": "",
            "alleTeknologierInfo": "",
        }
    }
    var alleTeknologierInfo = {
        "unikeTeknologier": [...new Set(results.data.reduce((a, c) => a.concat(c.teknologier.map(e => e.toLowerCase())), []))],
        "antallStillingerPerTeknologi": {},
        "alleTeknologier": results.data.reduce((a, c) => a.concat([...new Set(c.teknologier.map(e => e.toLowerCase()))]), []),
        "antallStillingerPerFrist": {
            "7": 0,
            "30": 0,
            "90": 0,
            "9000": 0,
        },
    }
    function finnAntall() {
        antall["fulltid"] = results.data.reduce((a, c) => c.position == "fulltid" ? 1 + a : 0 + a, 0);
        antall["deltid"] = results.data.reduce((a, c) => c.position == "deltid" ? 1 + a : 0 + a, 0);
        antall["annet"] = results.data.reduce((a, c) => c.position == "annet" ? 1 + a : 0 + a, 0);
        for (let el of alleTeknologierInfo.alleTeknologier) {
            alleTeknologierInfo.antallStillingerPerTeknologi[el] = alleTeknologierInfo.antallStillingerPerTeknologi[el] ?
            alleTeknologierInfo.antallStillingerPerTeknologi[el] + 1 : 1;
        }
        var temp = [];
        var dagensDato = new Date();
        results.data.forEach(e => {
            var frist = new Date(e.americanDate);
            var differanse = (frist - dagensDato) / 86400000;
            if (differanse < 7) alleTeknologierInfo.antallStillingerPerFrist["7"] = alleTeknologierInfo
            .antallStillingerPerFrist["7"] + 1;
            if (differanse < 30) alleTeknologierInfo.antallStillingerPerFrist["30"] = alleTeknologierInfo
            .antallStillingerPerFrist["30"] + 1;
            if (differanse < 90) alleTeknologierInfo.antallStillingerPerFrist["90"] = alleTeknologierInfo
            .antallStillingerPerFrist["90"] + 1;
            if (differanse <  9000) alleTeknologierInfo.antallStillingerPerFrist["9000"] = alleTeknologierInfo
            .antallStillingerPerFrist["9000"] + 1;
        });
        return temp;
    }
    finnAntall();
    results.info.antall = antall;
    results.info.alleTeknologierInfo = alleTeknologierInfo;

    var resterende = [];
    for(let e of Object.entries(request.query)){
        if(["sortFrist", "sortDate"].includes(e[0])){
            resterende.push(e);
            continue;
        }
        else if(e[0] == "limit" || e[0] == "page") continue;
        var [query, parameter] = e;
        results.data = allFunctions[query](parameter, results.data);
    }

    for(let i = 0; i < resterende.length; i++){
        var [query, parameter] = resterende[i];
        results.data = allFunctions[query](parameter, results.data);
    }
    results.totalt = results.data.length;

    if(limit && page) {
        results.data = allFunctions.page([limit, page], results.data);
    }
    else if(limit) results.data = allFunctions.limit(limit, results.data);
    else if(page) return "Du kan ikke bruke 'page'-parameteren uten å spesifisere 'limit'. De kan ikke adskilles. F.eks. /api/jobs?limit=10&page=2";
    return results;
}

//All functions used in the API
var allFunctions = {
    id(request, result){
        if(!request) return result;
        return result.find(e => e.id == request);
    },
    sortDate(request, result){
        if(!request) {
            return result;
        }
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
            return "Den sorteringsmåten der finnes ikke, du kan kun bruke 'down' og 'up'.";
        }
    },
    sortFrist(request, result){
        if(!request) return result;

        var deUtenFrist = [];
        var deMedFrist = [];
        result.forEach(e => {
            var num = parseInt(e.frist);
            if(isNaN(num)) deUtenFrist.push(e);
            else deMedFrist.push(e);
        })
        result = deMedFrist;
        
        if(request == "down"){
            result = result.sort((a, b) => {
                var [dag1, måned1, år1] = a.frist.split(".");
                var [dag2, måned2, år2] = b.frist.split(".");
                var dato1 = parseInt(`${år1}${måned1}${dag1}`);
                var dato2 = parseInt(`${år2}${måned2}${dag2}`);
                if(dato1 < dato2) return 1;
                else if(dato1 > dato2) return -1;
                else return 0;
            });
            return deUtenFrist.concat(result)
        }
        else if(request == "up"){
            result = result.sort((a, b) => {
                var [dag1, måned1, år1] = a.frist.split(".");
                var [dag2, måned2, år2] = b.frist.split(".");
                var dato1 = parseInt(`${år1}${måned1}${dag1}`);
                var dato2 = parseInt(`${år2}${måned2}${dag2}`);
                if(dato1 > dato2) return 1;
                else if(dato1 < dato2) return -1;
                else return 0;
            });
            return result.concat(deUtenFrist)
        }
        else{
            return "Den sorteringsmåten der finnes ikke, du kan kun bruke 'down' og 'up'.";
        }
    },
    limit(request, result){
        if(!request) {
            return result;
        }
        else if(request < 0 || request > 20000) {
            return "Limit kan kun være mellom og inklusivt 0 til og med 20000";
        }
        return result.slice(0, request);
    },
    page(request, result){
        var [limit, page] = request;
        limit = parseInt(limit);
        page = parseInt(page);
        page = page - 1;
        return result.slice(page * limit, (page * limit) + limit);
    },
    search(request, result){
        if(!request) {
            return result;
        }
        var params = request.toLowerCase().split(" ");
        var regex = new RegExp(`${params.join("|")}`, "gi");
        var fullText = "";
        var temp = [];
        result.forEach(e => {
            fullText = e.teknologier.join(" ") + " " + e.about.toLowerCase() + " " + e.title.toLowerCase() + " " + e.teaser.toLowerCase();
            fullText = [...new Set(fullText.split(" "))].join(" ");
            if((fullText.match(regex) || []).length > 0){
                temp.push(e);
            } 
        });
        return temp;
    },
    type(request, result){ 
        if(!request) return result;
        var params = request.toLowerCase().split(" ");
        return result.filter(job => {
            return params.some(jobType => jobType == job.position);
        });
    },
    tekno(request, result){
        if(!request) return result;
        var params = request.toLowerCase().split(" ");
        return result.filter(job => {
            return job.teknologier.some(teknologi =>{
                if(params.includes(teknologi.toLowerCase())) {
                    return job;
                }
            });
        });
    },
    frist(request, result){

        if(!request) return result;
        request = request.split(" ");
        var utløpte = request[1] ? request[1] : "false";
        var antallDager = request[0];
        var temp = [];
        var dagensDato = new Date();
        var count = 0;

        result.forEach(e => {
            var frist = new Date(e.americanDate);
            if(frist == "Invalid Date"){
                e.americanDate = e.americanDate.slice(1, -1);
                frist = new Date(e.americanDate);
            }
            var differanse = (frist - dagensDato) / 86400000;
            differanse = parseInt(Math.round(differanse));
            if(isNaN(parseInt(e.frist))){
                count = count + 1;
                temp.push(e);
            }
            else if(utløpte == "false"){
                if((antallDager >= differanse) && differanse >= 0){
                    temp.push(e);
                }
            }
            else if(utløpte == "true"){
                if(antallDager >= differanse){
                    temp.push(e);
                }
            }
            else{
                throw Error("Det der ekke en gyldig parameter imbesil!")
            }
        });
        return temp;
    },
    rare(request, result){


        if(request == '') {
            return result;
        }
        var deUtenFrist = [];
        var deMedFrist = [];
        result.forEach(e => {
            var num = parseInt(e.frist);
            if(isNaN(num)) deUtenFrist.push(e);
            else deMedFrist.push(e);
        })
        if(request == "true"){
            return deUtenFrist.concat(deMedFrist);
        }
        else if(request == "false"){
            return deMedFrist;
        }
        else{
            throw Error("Det der funker ikke brusjan. 'rare' kan kun ta i bruk 'true/false' u little dipshit \n");
        }
    }
}

//Export it
module.exports = router;