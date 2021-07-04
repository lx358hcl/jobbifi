//Instantiate
import express from 'express';
import firebaseApp from "../../firebase/firebaseconfig.js";

// For the default version 
import algoliasearch from 'algoliasearch'; 

// For the search only version 
const client = algoliasearch('0Z5J6B61BT', 'a298ec04554ffe5a8bdd490352dd474e'); 
const algoliaIndex = client.initIndex('jobbifijobs');

var router = express.Router();
var allowedKeys = ["search", "tekno", "type", "frist", "sortDate", "rare", "sortFrist", "id", "limit", "page", "source"];


//Jobs-route dirigent   
router.get("/api/jobs", async function (request, response){
    if(Object.keys(request.query).length == 0) await sendAll(request, response);
    else if(Object.keys(request.query).every(key => allowedKeys.includes(key))) {
        await searchHandler(request, response);
    }
    else response.send("Ugyldig API-call. Sjekk query-parametrene dine. Feilen har opphav i query-stringen.")
});

//Send all jobs to user
var sendAll = (request, response) => response.send("l");

//Search handler
async function searchHandler(request, response){
    response.send(await functions(request, response));
}

//This function gets called when searching jobs
async function functions(request, response){
    var søkeOrd = request.query;
    //Først får vi tak i all av tekstrepresentasjon
    var results = await algoliaIndex.search(søkeOrd);

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
            fullText = e.teaser.toLowerCase() + " " + e.about.toLowerCase();
            fullText = [...new Set(fullText.split(" "))].join(" ");
            if((fullText.match(regex) || []).length > 0){
                console.log("OK");
                temp.push(e);
            } 
        });
        return temp;
    },
    type(request, result){ 
        if(!request) return [];
        var params = request.toLowerCase().split(" ");
        return result.filter(job => {
            return params.some(jobType => jobType == job.position);
        });
    },
    source(request, result){ 
        if(!request) return [];
        var params = request.toLowerCase().split(" ");
        return result.filter(job => {
            return params.some(e => e == job.opprinnelse);
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
export default router;