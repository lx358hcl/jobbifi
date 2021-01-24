//Instantiate
var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var fs = require("fs");
var cors = require('cors');
app.use(cors());
var mongoose = require("mongoose");

var mongoDB = "mongodb+srv://lukamo:123321@jobbifi.zvt5c.mongodb.net/jobbifi-database?retryWrites=true&w=majority";
var db = mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function (result){
        console.log("connected");
    })
    .catch(function (err){
        console.log("error");
    });

//Require all routes
fs.readdir("./routes/", (err, elements) => {
    elements.forEach(el => {
        if(el != "models") app.use("/", require("./routes/" + el));
    });
    app.use("/*", function (request, response) {
        response.send("Error 404: Page not found");
        // response.sendFile(path.join(__dirname, '/static/404/404.html'));
    });
});

//Start server
var listening = () => console.log(`Listening at port: ${port}`);
var server = app.listen(port, listening);