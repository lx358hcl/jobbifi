//API Hovedside
var express = require("express");
var router = express.Router();
var path = require('path');

router.get("/api", function (request, response){
    console.log(request.params);
    response.sendFile(path.join(__dirname, "..", '/static/api/api.html'));
});

module.exports = router;