//Instantiate
import express from 'express';
import fs from 'fs';
import cors from 'cors';
import jobs from "./routes/jobs.js";

var app = express();
var port = process.env.PORT || 3000;

//Bruk cors
app.use(cors());

//Require all routes
app.use(jobs);

// app.use("/*", function (request, response) {
//     response.send("Error 404: Page not found");
// });

//Start server
var listening = () => console.log(`Listening at port: ${port}`);
var server = app.listen(port, listening);