//Puppeteer crawler for Finn.no, arbeidsplassen.no og ifinavet.no
//Kun IT-relaterte stillinger, ingen duplikater

//Firebase Pusher
import admin from "firebase-admin";
import puppeteer from "puppeteer";
import fs from "fs";
import cron from "node-cron";

var serviceAccount = {
  "type": "service_account",
  "project_id": "nevet-9e3ed",
  "private_key_id": "15c001f768d2b401fc81e32770a5971f87702b5f",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCZabupSJqtP5bD\nSSduKNzz8rD3XLjWkcJn5mTUZZvXa5wMJNUqZZIV6AP+KIMJQK8i/d7BY2Xz9V4F\nmTabAwXobQzRPcisW4nZVqVGhJ1BegrSN3Prp+EQTfknDi730eJSsh/tLyDvjerg\n+8R067PBW7aZfKwOTdOHENym/HjQlW0TEnyigitfVSQ/pnCK7pkbBJpFD7VQFaOt\nAWhBX9ATMAb/L1j3w7tQ693u48fHfILfcIdcDGLNbd5Za5dXkfjGUsrsj64EXHLI\nGdaJ4D/+FnNSnHX72muXCEIG+GKd/teJre6ILOOxtkoWv6vSII/o8S/B5r/FLQJt\nS1OUDo0DAgMBAAECggEAByGarN8asrWMb0KhbHOhibvBmwTjq0bfj90lInQgaowc\nKUzscOnxN34KzgtHMcfp0xcCR2B95ucWkRF8C1PBpdWIcf6xYg5DQyfNy0c8RmlV\negKyK3xNlLG7MjZIJO3MAC/NhGlttcve5RIl2LWF4ygY9Lb8LsjkyQXMotg7mXnt\nFTlxqP15M+JyjoZOuvwfXIsp4joE1k9DfT0Mc6ybMokecijZQ5BIr7XuiaBvqoS5\nIk4eCbRp52u39E5sj43Fg93Jvk/3/LMIO+HYi6Ql7B/R7e25e2LJUCOpg7AGGTUx\nkmTQ5SI6QnKafSag+K0tvxhrrTswzO4aLHU2GM7fwQKBgQDW6DX6t/6RdQnr9+lc\nZcfIFCFADALRvaazagydC2Ip3hREeDJLg9kC6NrtizfDnLc1GTd9ZK+dCvvJOxBZ\nAgL4l7HU5O24xTRHmP3U0DYNNRYSxX7Ri5mWqn0QJQ2QCkUZhDOJHo1wR/xHRptE\nCPv/ueK+6akuWtlk3V9soBOhoQKBgQC2v1z0kohQm8bLiDcVvb5bzh8vFMrYhisI\na7oa2WrzYrxWDbRRCmK44xw9E44KO7ZvaLietRIQbj2N8ZVJC1RmaJLsojquNPOI\nor5uJY1+7pkJSUhI1VuzE7eUzsja8ukC4QLjolWvWw5u7IX+Rlz2M10y3qZwNlSa\nZ+nc3hL0IwKBgCE82NxmCKFGkLpGJXl85GE1e88EDIuT4WxuQnUnhY8kIc5VKLI1\nOiMREIsctQsz+cHknIhwQhjv0fFViTm67eq0y3Q50+p31ZYdO2TmrvVr+HX+xZZz\nGNYMmDse//H/JKDFqZLTftyWxZXgfbMQEKmEfmU4jkn1ExpegpuyRlcBAoGBAJiI\nHyEwEUEe1I3bUwb9iZ5868BTXX/edJqhuANjB4bAGazF4YRm48GoJlDAOqVF898H\njFlDjyFRsmUAiHcgUsDrdf625b20CrU4CTRMec7BfdCnbwMDunc89NTqx/EgIOa7\nQrsXKuejW+ev2aNDvaHte1PTTR6J6pG6PBOS9ET7AoGAZF2hgvy9hO6wdW8/d+zC\nrtYjiSUhyAVM0iMiRrfAUoTVw3DzY+VgCUOoldhQdqvJGMXoLFA2PcLScTOblTqo\nCFywCiSXK/t5Bc/PYdE5ig70qCPMEqGmiJr6s56RT5Ym4xQQwFdSU3MsXJ6DpJvn\nh/bi9VFFEeX3zQrXKYRddag=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-mzwef@nevet-9e3ed.iam.gserviceaccount.com",
  "client_id": "103535212802088334955",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-mzwef%40nevet-9e3ed.iam.gserviceaccount.com"
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://nevet-9e3ed-default-rtdb.europe-west1.firebasedatabase.app"
});

//Firestore pusher
async function pushToFirestore() {

  var db = admin.firestore();
  var dataRaw = fs.readFileSync("./crawler/data.json");
  var dataRawParsed = JSON.parse(dataRaw);
  dataRawParsed = dataRawParsed.jobs;
  var settInnHistorikk = {};

  //Pusher vi ny data til database

  for (let i = 0; i < dataRawParsed.length; i++) {
    //Sjekk om dokumentet finnes

    var jobb = await db.collection("jobs").doc(dataRawParsed[i].id).get();
    settInnHistorikk[dataRawParsed[i].id] = true;


    if (jobb.exists == true) {
      var jobbData = jobb.data();

      // 
      await db.collection("jobs").doc(dataRawParsed[i].id).set({
        "americanDate": jobbData.americanDate ? jobbData.americanDate : "ingen dato",
        "companyImage": jobbData.companyImage ? jobbData.companyImage : "null",
        "companyName": jobbData.companyName ? jobbData.companyName : "null",
        "date": jobbData.date ? jobbData.date : "ingen dato",
        "frist": jobbData.frist ? jobbData.frist : "ingen frist",
        "opprinnelse": jobbData.opprinnelse ? jobbData.opprinnelse : "feil",
        "originalPosition": jobbData.originalPosition ? jobbData.originalPosition : "feil",
        "originalURL": jobbData.originalURL ? jobbData.originalURL : "feil",
        "position": jobbData.position ? jobbData.position : "feil",
        "sted": jobbData.sted ? jobbData.sted : jobbData.fulltSted,
        "teaser": jobbData.teaser ? jobbData.teaser : "Ingen sammendrag.",
        "teknologier": jobbData.teknologier ? jobbData.teknologier : [],
        "title": jobbData.title ? jobbData.title : "Ingen tittel",
        "url": jobbData.url ? jobbData.url : "null",
      })
    } else if (jobb.exists == false) {
      await db.collection("jobs").doc(dataRawParsed[i].id).set(dataRawParsed[i]);


    }
  }

  //Fjerner det som ikke ble oppdatert eller lagt til 
  var keys = Object.keys(settInnHistorikk);



  for (let i = 0; i < keys.length; i++) {
    var bleDetLagtTil = await db.collection("jobs").doc(keys[i]).get();


    if (bleDetLagtTil.exists == false) {


      await db.collection("jobs").doc(keys[i]).delete()
    } else {

    }
  }
}

var data = {};
var jobs = []

//Brukes for å endre amerikanske datoer til europeiske datoer
function switcharoo(a) {
  var temp = a.slice();
  a[0] = temp[1];
  a[1] = temp[0]
  return a;
}

//Lag dato for de som ikke er allerede lagt inn
var dagensDato = new Date();
var dag = dagensDato.getDate()
var måned = dagensDato.getMonth() + 1;
var år = dagensDato.getFullYear();

//Sjekk om de er ensifret
if (dag.toString().length == 1) dag = `0${dag}`;
if (måned.toString().length == 1) måned = `0${måned}`;

//Selve datoen for stillingen
var dato = `${dag}.${måned}.${år}`;


async function crawl() {
  //Start Headless Chrome
  const browser = await puppeteer.launch({
    headless: true
  });
  const page = await browser.newPage();

  try {
    //ifinavet.no begynner her
    //Login i ifinavet
    await page.goto("https://ifinavet.no/login", {
      waitUntil: 'domcontentloaded'
    });
    await page.evaluate(() => {
      document.querySelector(".input-group.login-field").querySelector("input").value = "lukamo";
      document.querySelector(".input-group.password-field").querySelector("input").value = "InspiredElement24120019";
      document.querySelector(".btn.btn-lg.btn-block").click();
    });
    await page.waitFor(2000);

    //Gå gjennom alle jobbene (30 er satt vilkårlig, det blir aldri så mange stillinger)
    for (let i = 0; i < 30; i++) {
      await page.goto(`https://ifinavet.no/api/jobs?page=${i}`, {
        waitUntil: 'domcontentloaded'
      });
      var webpage = await page.evaluate(() => {
        return document.querySelector("body").textContent;
      });
      jobs.push(webpage);
    }

    //Finpuss av innholdet, husker ikke helt hvorfor dette med flat() og mapping var nødvendig men whatever
    jobs = jobs.map(e => JSON.parse(e));
    jobs = jobs.map(e => e.events);
    jobs = jobs.flat();
    jobs.forEach(e => {
      e.frist = e.date;
      e.date = dato;
      e.opprinnelse = "ifijobs";
      e.companyImage = `https://ifinavet.no/images/original/${e.companyImage}`;
    });

    //Legg til teknologier ved å skanne igjennom tittel og about etter ord i tecnologies.
    var technologies = ["vue", "web", "clojure", "linux", "C++", "trusseletteretning", "sikkerhetsanalyse", "logganalyse", "redux", "genus", "node", "app", "backend", "frontend", "swift", "dart", "go", "kafka", "flutter", "javascript", "python", "kotlin", "react", "java", "azure", "node.js", "kubernetes", "docker", "typescript", "mongodb", "mysql", "css", "html", "ux", "ui", "design", "machine learning", "C", "net", "c#", "sql", "uml", "ai", "webdesign", "uml", "angular", "aws", "platform.sh", "nosql", "api", "soap", "github", "gitlab", "php", "powershell", "reactjs", "vuejs", "angularjs", "google"];
    jobs.forEach(e => {
      var text = (e.about + " " + e.title).match(/[A-Åa-å+]+/gi, " ");
      e["teknologier"] = [...new Set(text.filter(e => technologies.includes(e.toLowerCase())))];
    });

    //Sett stillingstypen til små bokstaver
    jobs.forEach(e => e.position = e.position.toLowerCase());

    //Lag et amerikansk dato objekt av dato-en allerede i jobben + legg til ifinavet URL-en og sted.
    jobs.forEach(f => {
      f.americanDate = f.frist;
      f.americanDate = f.americanDate.split(".");
      f.americanDate = new Date(switcharoo(f.americanDate).join(".")).getTime();
      f.originalURL = `https://www.ifinavet.no/job/${f.id}`;
      f.id = f.id;
      f.sted = "Oslo";
    });
  } catch {

  }

  //Finn.no begynner her
  //Gå gjennom alle jobbene (30 er satt vilkårlig, det blir aldri så mange stillinger)
  for (let i = 1; i < 30; i++) {
    //Finn hovedlink
    await page.goto(`https://www.finn.no/job/fulltime/search.html?industry=65&industry=8&industry=33&industry=26&industry=23&industry=7&industry=25&industry=5&industry=21&industry=20&industry=4&industry=3&industry=9999&industry=64&industry=61&industry=62&industry=63&industry=6&industry=60&industry=59&industry=58&industry=57&industry=56&industry=55&industry=53&industry=52&industry=51&industry=49&industry=50&industry=48&industry=46&industry=66&industry=45&industry=67&industry=44&industry=43&industry=42&industry=41&industry=40&industry=39&industry=38&industry=69&industry=37&industry=36&industry=35&industry=34&industry=11&industry=68&industry=10&industry=9&industry=32&industry=70&industry=31&industry=30&industry=29&industry=27&industry=28&industry=24&industry=22&industry=19&industry=18&industry=17&industry=15&industry=16&industry=14&industry=2&industry=13&industry=12&industry=1&occupation=0.23&occupation=0.22&page=${i}&sort=PUBLISHED_DESC`, {
      waitUntil: 'networkidle2'
    });

    //Skaff alle linkene på gitt side og stedene på hver annonse også
    var linker = await page.evaluate(() => [...document.querySelectorAll(".ads__unit__link")].map(e => e.href));
    var steder = await page.evaluate(() => [...document.querySelectorAll(".ads__unit__content__details .u-stone")].map(e => e.textContent.split(" | ")[1]));

    //Loop gjennom linkene
    for (let j = 1; j < linker.length; j++) {
      //Åpne siden
      if (linker[i]) await page.goto(`${linker[j]}`);
      else continue;

      //Vent litt for å unngå null-buggen
      // await page.waitFor(1500);

      //Injiser scriptet nedenfor inn i siden
      var stilling = await page.evaluate((steder, j, dato, technologies) => {
        //Stillingsobjektet der alt lagres
        var obj = {};

        //Må redefineres her pga kjent puppeteer problematikk
        function switcharoo(a) {
          var temp = a.slice();
          a[0] = temp[1];
          a[1] = temp[0]
          return a;
        }

        //Navn på stillingen
        var title = document.querySelector(".u-t2.u-word-break").textContent;
        obj["title"] = title;

        //Opprinnelse
        obj["opprinnelse"] = "finn";

        //About
        obj["about"] = document.querySelector(".import-decoration").innerHTML;

        //About pure
        obj["aboutPure"] = obj["about"].replace(/<[^>]*>?/gm, '').replace(/(&nbsp;)/gi, " ");

        //Teaser
        obj["teaser"] = obj["about"].replace(/(<([^>]+)>)/ig, '').replace(/(&nbsp;)/gi, " ").slice(0, 170) + " ...";

        //Annen stillingsinfo
        var info = document.querySelectorAll(".definition-list")[0].innerText.split("\n");
        var fristIndex = document.querySelectorAll(".definition-list")[0].innerText.split("\n").findIndex(e => e == "Frist");
        var stillingsIndex = document.querySelectorAll(".definition-list")[0].innerText.split("\n").findIndex(e => e == "Ansettelsesform");
        var arbeidsgiverIndex = document.querySelectorAll(".definition-list")[0].innerText.split("\n").findIndex(e => e == "Arbeidsgiver");
        obj["frist"] = fristIndex != -1 ? info[fristIndex + 1] : "Ingen frist";
        obj["position"] = stillingsIndex != -1 ? info[stillingsIndex + 1] : "Ingen position";
        obj["companyName"] = arbeidsgiverIndex != -1 ? info[arbeidsgiverIndex + 1] : "Ingen navn";

        //Gjør fristen om til amerikansk dato
        //Amerikansk dato - Gjør fristen om til amerikansk dato
        if (isNaN(parseInt(obj.frist))) {
          obj["americanDate"] = JSON.stringify(new Date().getTime());
        } else {
          obj["americanDate"] = obj.frist.split(".");
          obj["americanDate"] = new Date(switcharoo(obj["americanDate"]).join(".")).getTime();
        }

        //Id
        obj["id"] = window.location.search.slice(window.location.search.indexOf("=") + 1);

        //Søkeknapp
        var søkeKnapp;
        try {
          søkeKnapp = document.querySelector("#job-apply-button").href;
        } catch {
          søkeKnapp = window.location.href;
        }
        obj["url"] = søkeKnapp;

        //Dato
        obj["date"] = dato;

        //Link til originalsiden
        var originalURL = window.location.href;
        obj["originalURL"] = originalURL;

        //Sted
        var sted = steder[j];
        var stedIndex = [...document.querySelector(".definition-list.definition-list--inline").children].findIndex(e => e.textContent == "Sted");
        var fulltSted = document.querySelector(".definition-list.definition-list--inline").children[stedIndex + 1].textContent;
        obj["fulltSted"] = fulltSted;
        obj["sted"] = sted;

        //Teknologi
        obj["teknologier"] = [];
        var technologies = ["vue", "web", "clojure", "linux", "C++", "trusseletteretning", "sikkerhetsanalyse", "logganalyse", "redux", "genus", "node", "app", "backend", "frontend", "swift", "dart", "go", "kafka", "flutter", "javascript", "python", "kotlin", "react", "java", "azure", "node.js", "kubernetes", "docker", "typescript", "mongodb", "mysql", "css", "html", "ux", "net", "c#", "sql", "uml", "ai", "webdesign", "uml", "angular", "aws", "platform.sh", "nosql", "api", "soap", "github", "gitlab", "php", "powershell", "reactjs", "vuejs", "angularjs", "google"];
        var text = (obj.about + " " + obj.title).match(/[A-Åa-å+]+/gi, " ");
        obj["teknologier"] = [...new Set(text.filter(e => technologies.includes(e.toLowerCase())))];

        //Bilde
        if (document.querySelector(".img-format__img") && document.querySelector(".img-format__img").src) {
          bildeLink = document.querySelector(".img-format__img").src;
        } else if (document.querySelector(".extended-profile-job__branding-image") && document.querySelector(".extended-profile-job__branding-image").src) {
          bildeLink = document.querySelector(".extended-profile-job__branding-image").src;
        } else {
          bildeLink = "https://image.shutterstock.com/image-vector/no-user-profile-picture-hand-260nw-99335579.jpg";
        }
        obj["companyImage"] = bildeLink;

        //Returner til stillingsobjektet
        return obj;
      }, steder, j, dato, technologies);

      //Push stillingen inn i jobb-listen
      jobs.push(stilling);

    }
  }

  //Arbeidsplassen.no begynner her
  //Skaff alle linkene, 2000 er satt vilkårlig, det er aldri så mange IT-stillinger
  await page.goto(`https://arbeidsplassen.nav.no/stillinger?to=2000&occupationFirstLevels[]=IT`, {
    waitUntil: 'networkidle2'
  });

  //Få tak i info fra stillingssiden infosiden
  var alleStillinger = await page.evaluate(() => [...document.querySelectorAll(".SearchResultItem > a")].filter(e => e.href.match(/(finn.no)/) == null).map(e => {
    var stilling = {
      "link": e.href,
      "date": e.querySelector(".typo-undertekst.SearchResultsItemDetails__published").textContent,
      "sted": e.querySelector(".typo-normal.SearchResultsItemDetails__location").textContent,
      "frist": e.querySelector(".typo-normal.SearchResultsItemDetails__applicationdue").textContent.split(":")[1].trim(),
      "companyName": e.querySelector(".typo-normal.SearchResultsItemDetails__employer").textContent,
    }
    return stilling;
  }));

  //Loop over linkene fra oppsamlede stillinger fra "alleStillinger"
  for (let i = 0; i < alleStillinger.length; i++) {
    //Åpne siden
    await page.goto(`${alleStillinger[i]["link"]}`, {
      waitUntil: 'networkidle2'
    });

    //Vent litt for å unngå null-buggen
    await page.waitFor(1500);



    //Injiser scriptet nedenfor inn i siden
    var stilling = await page.evaluate((alleStillinger, i, technologies) => {

      //Stillingsobjektet der alt lagres
      var obj = {};

      //Må redefineres pga kjent puppeteer problematikk
      function switcharoo(a) {
        var temp = a.slice();
        a[0] = temp[1];
        a[1] = temp[0]
        return a;
      }

      //Navn på stillingen
      var tittel = "null";
      try {
        tittel = document.querySelector(".Stilling__h1").textContent;
      } catch {


      };
      obj["title"] = tittel;

      //Opprinnelse
      obj["opprinnelse"] = "arbeidsplassen";

      //Publiseringsdato
      obj["frist"] = alleStillinger[i].frist;

      //CompanyName
      obj["companyName"] = alleStillinger[i].companyName;

      //CompanyImage
      obj["companyImage"] = "https://arbeidsplassen.nav.no/public/arbeidsplassen-og-image.jpg";

      //Frist
      obj["frist"] = alleStillinger[i].frist;

      //Dato
      obj["date"] = alleStillinger[i].date;

      //ID
      obj["id"] = window.location.pathname.slice(window.location.pathname.indexOf("stilling/") + 9);

      //Amerikansk dato - Gjør fristen om til amerikansk dato
      if (isNaN(parseInt(obj.frist))) {
        obj["americanDate"] = new Date().getTime();
      } else {
        obj["americanDate"] = obj.frist.split(".");
        obj["americanDate"] = new Date(switcharoo(obj["americanDate"]).join(".")).getTime();
      }

      //About
      var aboutText = null;
      try {
        obj["about"] = document.querySelector(".AdText").innerHTML;
      } catch {

      };

      //Teaser
      try {
        obj["teaser"] = obj["about"].replace(/(<([^>]+)>)/ig, '').replace(/(&nbsp;)/gi, " ").slice(0, 170) + " ...";
      } catch {
        obj["teaser"] = "null";
      }

      //Stillingstype
      var index = [...document.querySelectorAll(".detail-section__body > .dl-flex.typo-normal > dt")].findIndex(e => e.textContent == "Heltid/deltid:");
      if (index != -1 || !index) {
        obj["position"] = document.querySelectorAll(".detail-section__body > .dl-flex.typo-normal > dd")[index].textContent;
      } else {
        obj["position"] = "NoeAnnet";
      }
      var søkeKnapp = "";
      //Søkeknapp
      if (document.querySelector("#job-apply-button") && document.querySelector("#job-apply-button").href) {
        søkeKnapp = document.querySelector("#job-apply-button").href;
      } else {
        søkeKnapp = `${alleStillinger[i]["link"]}`;
      }
      obj["url"] = søkeKnapp;

      //Link til originalsiden
      var originalURL = window.location.href;
      obj["originalURL"] = originalURL;

      //Sted
      obj["sted"] = alleStillinger[i].sted;

      //Teknologier tilstede
      var technologies = ["vue", "web", "clojure", "linux", "C++", "trusseletteretning", "sikkerhetsanalyse", "logganalyse", "redux", "genus", "node", "app", "backend", "frontend", "swift", "dart", "go", "kafka", "flutter", "javascript", "python", "kotlin", "react", "java", "azure", "node.js", "kubernetes", "docker", "typescript", "mongodb", "mysql", "css", "html", "ux", "net", "c#", "sql", "uml", "ai", "webdesign", "uml", "angular", "aws", "platform.sh", "nosql", "api", "soap", "github", "gitlab", "php", "powershell", "reactjs", "vuejs", "angularjs", "google"];
      var text = (obj.about + " " + obj.title).match(/[A-Åa-å+]+/gi, " ");
      obj["teknologier"] = [...new Set(text.filter(e => technologies.includes(e.toLowerCase())))];

      return JSON.stringify(obj);
    }, alleStillinger, i, technologies);

    jobs.push(JSON.parse(stilling));
  }

  //Gi alle stillingene en antall Likes og gjør typen jobb mer ensformig
  jobs = jobs.filter(e => e);
  jobs.forEach((e, i) => e["likes"] = 0);
  jobs.forEach(e => {
    e["lastmodified"] = new Date().getTime();
  })
  jobs.forEach(e => {
    if (!e.position)
      e.originalPosition = e.position.toLowerCase();
  })
  jobs.forEach(e => {
    e.position = e.position.toLowerCase();
    if (e.position == "parttime") e.position = "deltid";
    else if (e.position == "fulltime") e.position = "fulltid";
    else if (e.position == "fast") e.position = "fulltid";
    else if (e.position == "heltid") e.position = "fulltid";
    else e.position = "annet";
  });

  //Gi stillingslisten en nøkkelid "jobs" i data
  data["jobs"] = jobs;

  //Lagre data
  fs.writeFileSync('./crawler/data.json', JSON.stringify(data));

  //Close the crawler
  await browser.close()

  //Push to firebase
  pushToFirestore();

}

    crawl()