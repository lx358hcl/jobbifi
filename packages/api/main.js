//Instantiate
var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var fs = require("fs");
var cors = require('cors');
<<<<<<< HEAD

//Bruk cors
=======
>>>>>>> cd212d7ffbb92ecee196d5f29f80185a3347af93
app.use(cors());

//Require all routes
fs.readdir("./routes/", (err, elements) => {
    elements.forEach(el => {
<<<<<<< HEAD
        if(["index.js", "jobs.js", "sendEpost.js", "lagret.js"].includes(el)) {
            app.use("/", require("./routes/" + el));
        }
    });
    app.use("/*", function (request, response) {
        response.send("Error 404: Page not found");
=======
        console.log(el);
        if(["index.js", "jobs.js", "lagret.js"].includes(el)) app.use("/", require("./routes/" + el));
    });
    app.use("/*", function (request, response) {
        response.send("Error 404: Page not found");
        // response.sendFile(path.join(__dirname, '/static/404/404.html'));
>>>>>>> cd212d7ffbb92ecee196d5f29f80185a3347af93
    });
});

//Start server
var listening = () => console.log(`Listening at port: ${port}`);
var server = app.listen(port, listening);