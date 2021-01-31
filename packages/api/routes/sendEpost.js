//Send epost API
//Instantiate
var express = require("express");
var bodyParser = require('body-parser')
var router = express.Router();
var nodemailer = require('nodemailer');

//Initialiser nodemailer
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jobbifitjenester@gmail.com',
        pass: 'InspiredElement24120019',
    }
});

//Use bodyparser
router.use(bodyParser.json());

//Mottakelse av GET-requests
router.get("/api/privat/sendEpost", function (request, response){
    response.send("results");
});

//Mottakelse av POST-requests
router.post("/api/privat/sendEpost", function (request, response){
    var navn = "request.navn";
    var emne = "request.emne";
    var mottakerEpost = "request.mottakerEpost";
    var melding = "request.melding";
    var mottaKopi = "request.mottaKopi;";

    var mailOptions = {
        from: "navn ? navn : mottakerEpost",
        to: 'luka_momcilovic@hotmail.com',
        subject: "emne",
        text: "melding",
    };

    // //Skal personen ha kopi av eposten?
    // if(mottaKopi){
    //     var mailOptions = {
    //         from: "Jobbifi har mottatt melding din",
    //         to: mottakerEpost,
    //         text: `Nedenfor kan du se den mottatte melding: \n ${ emne } \n ${ melding }`,
    //     };
    //     transporter.sendMail(mailOptions, function(error, info){
    //         if (error) console.log(error);
    //         else console.log('Epost sendt: ' + info.response);
    //     });
    // }

    //Send epost til momcilovicene
    transporter.sendMail(mailOptions, function(error, info){
        console.log(mailOptions)
        if (error) console.log(error);
        else console.log('Epost sendt: ' + info.response);
    });
});

module.exports = router;