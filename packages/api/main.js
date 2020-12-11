//Instantiate

var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var fs = require("fs");
var cors = require('cors');
app.use(cors());

//Require all routes
fs.readdir("./routes/", (err, elements) => {
    elements.forEach(el => app.use("/", require("./routes/" + el)));
    app.use("/*", function (request, response) {
        response.send("Error 404: Page not found");
        // response.sendFile(path.join(__dirname, '/static/404/404.html'));
    });
});

//Start server
var listening = () => console.log(`Listening at port: ${port}`);
var server = app.listen(port, listening);