//Send epost API
//Configure .dotenv
require('dotenv').config()

//Instantiate
var express = require("express");
var bodyParser = require('body-parser')
var router = express.Router();
var nodemailer = require('nodemailer');

//Initialiser nodemailer
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.API_EPOST_SENDER,
        pass: process.env.API_SEND_EPOST_PASS,
    }
});

//Use bodyparser
router.use(bodyParser.json());

// //Mottakelse av GET-requests
// router.get("/api/privat/sendEpost", function (request, response){
//     response.send("results");
// });

//Mottakelse av POST-requests
router.post("/api/privat/sendEpost", function (request, response){
    console.log("vi sender en epost!!!")
    var navn = request.body.navn;
    var emne = request.body.emne;
    var senderEpost = request.body.senderEpost;
    var melding = request.body.melding;
    var mottaKopi = request.body.mottaKopi;

    var mailOptions = {
        to: 'luka_momcilovic@hotmail.com',
        subject: emne,
        text: `Dette er en e-post fra: ${navn}\n\nEpost: ${senderEpost}\n\n` + "Meldingen er: \n\n" + melding,
    };

    //Skal personen ha kopi av eposten?
    if(mottaKopi){
        var optionsTo = {
            to: senderEpost,
            subject: "Kopi av meldingen din til jobbifi",
            text: `Takk for henvendelsen :) Jobbifi har mottatt e-posten din og vil svare deg så fort som mulig. Nedenfor kan du se den mottatte meldingen din:\n\nEmne: ${ emne }\nNavn: ${navn}\nMelding: \n${ melding }`,
        };
        transporter.sendMail(optionsTo, function(error, info){
            if (error) console.log(error);
            else console.log('Epost sendt: ' + info.response);
        });
    }

    //Send epost til Luka Momcilovic
    transporter.sendMail(mailOptions, function(error, info){
        console.log("Dette er mailoptions");
        console.log(mailOptions);
        if (error) console.log(error);
        else console.log('Epost sendt: ' + info.response);
    });
    response.send("this stops duplicate emails from being sent, apparently this is necessary, why didn't anyone tell me about this ffs");
});

module.exports = router;