//Instantiate
var express = require("express");
var router = express.Router();

//Brukere-lagret data dirigent
router.get("/api/brukere", async function (request, response){
    // var results = await db.alleBrukere();
    response.send("results");
});

module.exports = router;