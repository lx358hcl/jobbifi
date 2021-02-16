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
    var navn = request.body.navn;
    var emne = request.body.emne;
    var mottakerEpost = request.body.mottakerEpost;
    var melding = request.body.melding;
    var mottaKopi = request.body.mottaKopi;

    var mailOptions = {
        from: mottakerEpost,
        to: 'luka_momcilovic@hotmail.com',
        subject: emne,
        text: `Dette er en e-post fra: ${navn}\n\n` + melding,
    };

    //Skal personen ha kopi av eposten?
    if(mottaKopi){
        var mailOptions = {
            from: "Takk for henvendelsen :) Jobbifi har mottatt e-posten din og vil svare deg så fort som mulig",
            to: mottakerEpost,
            text: `Nedenfor kan du se den mottatte melding din:\n\nEmne: ${ emne }\nNavn: ${navn}\nMelding: \n${ melding }`,
        };
        transporter.sendMail(mailOptions, function(error, info){
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
});

module.exports = router;