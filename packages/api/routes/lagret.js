//Instantiate
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
console.log("OK222");

//Brukere-lagret data dirigent
router.get("/api/brukere", function (request, response){
    var schema = new mongoose.Schema({
        navn: String
    });
    schema.set("collection", "lagret");
    var Bruker = mongoose.models.Bruker || mongoose.model("Bruker", schema);
    Bruker.find({}, function (err, kittens) {
        if (err) return console.error(err);
        console.log(kittens);
    });
    response.send("hello from brukere lagres.js");
});

module.exports = router;