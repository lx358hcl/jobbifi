//Needed stuff
const puppeteer = require('puppeteer');
const fs = require('fs');
var ifievents = [];
var jobs = [];
var tekna = [];
var element = "";
var tekna2 = [];

function switcharoo(a, e1, e2){
  var temp = a[e1];
  a[e1] = a[e2];
  a[e2] = temp;
} 

(async () => {

  //Start Headless Chrome
  const browser = await puppeteer.launch({headless:false});
  const page =  await browser.newPage();

  //Login ifinavet
  await page.goto("https://ifinavet.no/login", { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    document.querySelector(".input-group.login-field").querySelector("input").value = "lukamo";
    document.querySelector(".input-group.password-field").querySelector("input").value = "InspiredElement24120019";
    document.querySelector(".btn.btn-lg.btn-block").click();
  });
  await page.waitFor(2000);

  //Events (20 er satt vilkårlig)
  for(let i = 0; i < 30; i++){
    await page.goto(`https://ifinavet.no/api/events?page=${i}`, { waitUntil: 'domcontentloaded' });
      element = await page.evaluate(() => {
        return document.querySelector("body").textContent;
      });
    ifievents.push(element.replace(/(<([^>]+)>)/ig, ''));
  }

  //Jobs (20 er satt vilkårlig)
  for(let i = 0; i < 30; i++){
    await page.goto(`https://ifinavet.no/api/jobs?page=${i}`, { waitUntil: 'domcontentloaded' });
      element = await page.evaluate(() => {
        return document.querySelector("body").textContent;
      });
    jobs.push(element.replace(/(<([^>]+)>)/ig, ''));
  }

  //Finpuss av innholdet
  jobs = jobs.map(e => JSON.parse(e));
  jobs = jobs.map(e => e.events);
  jobs = jobs.flat();
  jobs.forEach(e => {
    e.type = "jobs";
    e.companyImage = `https://ifinavet.no/images/original/${e.companyImage}`;
  });

  //Legg til teknologier
  var technologies = ["vue", "web", "clojure", "linux", "C++", "trusseletteretning", "sikkerhetsanalyse", "logganalyse", "redux", "genus", "node", "app", "backend", "frontend", "swift", "dart", "go", "kafka", "flutter", "javascript", "python", "kotlin", "react", "java", "azure", "node.js", "kubernetes", "docker", "typescript", "mongodb", "mysql", "css", "html", "ux", "net", "c#", "sql", "uml", "ai", "webdesign", "uml", "angular", "aws", "platform.sh", "nosql", "api", "soap", "github", "gitlab", "php", "powershell", "reactjs", "vuejs", "angularjs", "google"];
  jobs.forEach(e => {
    var text = (e.about.toLowerCase() + e.title.toLowerCase()).replace(/\W+/gi, " ").split(" ");
    e["teknologier"] = [...new Set(text.filter(e => technologies.includes(e)))];
  });

  console.log(jobs);

  //Tekna (20 er satt vilkårlig)
  for(let i = 1; i < 30; i++){
    await page.goto(`https://www.tekna.no/kurs/?page=${i}`, { waitUntil: 'domcontentloaded' });
      element = await page.evaluate(() => {
        var array = [];
        document.querySelectorAll(".hiderow").forEach(e => {
          array.push(e.children[0].children[0].href);
        });
        return array;
      });
    tekna.push(element);
  }

  //Skaff Tekna Informasjon
  tekna = tekna.flat();

  for(let i = 0; i < tekna.length; i++){
    await page.goto(tekna[i], { waitUntil: "domcontentloaded" });
    await page.setDefaultNavigationTimeout(0); 

    element = await page.evaluate((args1) => {
      var heading = document.querySelector("#fitHeading") ? document.querySelector("#fitHeading").textContent : document.querySelector(".conference__carousel__title").textContent;
      var placeName = document.querySelector(".event__time-date") ? document.querySelector(".event__time-date").children[document.querySelector(".event__time-date").children.length - 1].textContent.trim().replace(/[\n]/gi, "").trim() : "ingen plass";
      var googlePlace = document.querySelector(".event__time-date a") ? document.querySelector(".event__time-date a").href : "no link";
      var description = document.querySelector("p.intro--event") ? document.querySelector("p.intro--event").textContent : "ingen beskrivelse";
      var price = document.querySelector(".event__data") ? document.querySelector(".event__data").textContent.match(/[A-Åa-å0-9:,.]+/gi, "").join(" ") : "Gratis";
      var date = document.querySelector(".icon-calendar") ? document.querySelector(".icon-calendar").parentElement.textContent.trim() : "nope";
      var status = document.querySelector(".js-signup-url.button.button--alt.expand.button-special") && document.querySelector(".js-signup-url.button.button--alt.expand.button-special").textContent == "Meld meg på" ? true : false;
      var bilde = document.querySelector("figure.topimage img") ? document.querySelector("figure.topimage img").src : "https://www.dinengros.no/laravel/public/images/dinengros/P8UgWmJ8UMoHwSOkKGJc2pm28F2IVhxfdnqnUc8U.jpeg";
      class event {
        constructor(heading, date, placeName, googlePlace, price, description, status, url, id){
            this.heading = heading;
            this.date = date;
            this.placeName = placeName;
            this.googlePlace = googlePlace;
            this.price = price;
            this.description = description;
            this.status = status;
            this.url = url;
            this.id = id;
            this.bilde = bilde;
        }
      }
      return new event(heading, date, placeName, googlePlace, price, description, status, args1, heading.toLowerCase().split(" ").join("-"));
    }, tekna[i]);

    tekna2.push(element);

  }

  var datopiss = [];

  //Mer Tekna
  var fagTyper = {
    "BYGG":"Bygg, anlegg og eiendom",
    "ENERGI":"Energi og klima",
    "FORSKING":"Forskning og innovasjon",
    "INDUSTRI":"Industri",
    "IT":"IT og tele",
    "VER":"IT-verktøy",
    "LEDUT":"Ledelse og utvikling",
    "MARITIM":"Maritim teknologi",
    "MILJO":"Miljø- og biovitenskap",
    "OLJE":"Olje og gass",
    "REALFAG":"Realfag og utdanning",
    "SAMF":"Samferdsel, infrastruktur og areal",
  }
var allLinks = [];
  for(el in fagTyper){
    for(let i = 1; i <= 40; i++){
      await page.goto(`https://www.tekna.no/kurs/?fag=${el}&page=${i}`, { waitUntil: "domcontentloaded" });

      var links = await page.evaluate(() => {
        var elements = document.querySelectorAll(".event-list__itemlink a");
        var linkList = [];
        elements.forEach(e => linkList.push(e.href));
        return linkList;        
      });
      allLinks.push(links);
    };
  };
  allLinks = allLinks.flat();

  //Hent linkene igjen, men få tak i de som ikke finnes ved første forsøk
  for(let i = 0; i < allLinks.length; i++){
    await page.goto(allLinks[i], { waitUntil: "domcontentloaded" });
    await page.setDefaultNavigationTimeout(0); 

    element = await page.evaluate(() => {
      var heading = document.querySelector("#fitHeading") ? document.querySelector("#fitHeading").textContent : document.querySelector(".conference__carousel__title").textContent;
      var placeName = document.querySelector(".event__time-date") ? document.querySelector(".event__time-date").children[document.querySelector(".event__time-date").children.length - 1].textContent.trim().replace(/[\n]/gi, "").trim() : "ingen plass";
      var googlePlace = document.querySelector(".event__time-date a") ? document.querySelector(".event__time-date a").href : "no link";
      var description = document.querySelector("p.intro--event") ? document.querySelector("p.intro--event").textContent : "ingen beskrivelse";
      var price = document.querySelector(".event__data") ? document.querySelector(".event__data").textContent : "Gratis";
      var date = document.querySelector(".icon-calendar") ? document.querySelector(".icon-calendar").parentElement.textContent.trim().replace(/[\s]/gi, "").trim() : "nope";
      var status = document.querySelector(".js-signup-url.button.button--alt.expand.button-special") && document.querySelector(".js-signup-url.button.button--alt.expand.button-special").textContent == "Meld meg på" ? true : false;
      class event {
        constructor(heading, date, placeName, googlePlace, price, description, status, url, id){
            this.heading = heading;
            this.date = date;
            this.placeName = placeName;
            this.googlePlace = googlePlace;
            this.price = price;
            this.description = description;
            this.status = status;
            this.url = url;
            this.id = id;
        }
      }
      return new event(heading, date, placeName, googlePlace, price, description, status, window.location.href, heading.toLowerCase().split(" ").join("-"));
    });

    tekna2.push(element);

  }

  console.log(tekna2);

  console.log(tekna2);

  //Kurstype
  var kursTyper = {
    "1": "Faglig",
    "2": "Politisk",
    "3": "Sosialt",
    "4": "Årsmøte",
    "5": "Tillitsvalgt",
  }
  for(let i = 1; i <= 5; i++){

    for(let j = 1; j < 30; j++){

      await page.goto(`https://www.tekna.no/kurs/?type=${i}&page=${j}`, { waitUntil: "domcontentloaded" });

      var links = await page.evaluate(() => {
        var elements = document.querySelectorAll(".event-list__itemlink a");
        var linkList = [];
        elements.forEach(e => linkList.push(e.href));
        return linkList;        
      });

      links.forEach(e => {
        var foundIndex = tekna2.findIndex(f => f.url == e);
        if(foundIndex != -1) {
          tekna2[foundIndex].kursType = kursTyper[i];
        }
      });

    };

  };

  //Fagområde
  var fagTyper = {
    "BYGG":"Bygg, anlegg og eiendom",
    "ENERGI":"Energi og klima",
    "FORSKING":"Forskning og innovasjon",
    "INDUSTRI":"Industri",
    "IT":"IT og tele",
    "VER":"IT-verktøy",
    "LEDUT":"Ledelse og utvikling",
    "MARITIM":"Maritim teknologi",
    "MILJO":"Miljø- og biovitenskap",
    "OLJE":"Olje og gass",
    "REALFAG":"Realfag og utdanning",
    "SAMF":"Samferdsel, infrastruktur og areal",
  }

    for(el in fagTyper){
      for(let i = 1; i <= 40; i++){
        await page.goto(`https://www.tekna.no/kurs/?fag=${el}&page=${i}`, { waitUntil: "domcontentloaded" });

        var links = await page.evaluate(() => {
          var elements = document.querySelectorAll(".event-list__itemlink a");
          var linkList = [];
          elements.forEach(e => {
            linkList.push(e.href);
          })
          return linkList;        
        });
  
        links.forEach(e => {
          tekna2.forEach(f => {
            if(e == f.url){
              f.fagType = fagTyper[el];
            }
          })
        });

      };
    };


  ifievents = ifievents.map(e => JSON.parse(e));
  ifievents = ifievents.map(e => e.events);
  ifievents = ifievents.flat();
  ifievents.forEach(e => {
    e.type = "ifievents";
    e.companyImage = `https://ifinavet.no/images/original/${e.companyImage}`;
  });

  tekna2.forEach(e => e.type = "tekna");

  var results = {
    "tekna": tekna2,
    "jobs": jobs,
    "ifievents": ifievents,
  }

  //Tekna datoer
  for(let i = 1; i < 30; i++){
    await page.goto(`https://www.tekna.no/kurs/?page=${i}`, { waitUntil: 'domcontentloaded' });
      element = await page.evaluate(() => {
        var array = [];
        document.querySelectorAll(".event-list__itemdate").forEach(e => {
          array.push(e.textContent.trim());
        });
        return array;
      });
    datopiss.push(element);
  }
  datopiss = datopiss.flat();

  //Push datene inn i tekna2.
  for(let i = 0; i < datopiss.length; i++){
    tekna2[i].riktigDato = datopiss[i];
  }

  //Fjern Tekna duplikater
  var ryddeObj = {};
  results.tekna.forEach(e => ryddeObj[e.url] = ryddeObj[e.url] ? ryddeObj[e.url].concat(e) : [e]);
  var arr = [];
  Object.values(ryddeObj).forEach(e => arr.push(e[0]))
  results.tekna = arr;

  //Hent mer innhold for ifi-events
  var temp = [results.jobs, results.ifievents].flat();
  console.log("_____");
  console.log(tekna2);
  
  for(let i = 0; i < temp.length; i++){
    console.log("hallelula");
    var element = temp[i];
    var res = undefined;

    if(element.type == "ifievents"){
      console.log("vi er inne")
      element.url = `https://ifinavet.no/event/${element.id}`;
      await page.goto(element.url, {waitUntil: "domcontentloaded"});

      res = await page.evaluate(() => {
        var registrationLabel = document.querySelector("#message-form").textContent.toLowerCase().trim();
        var plasserIgjen = document.querySelector(".fa.fa-users").offsetParent.innerText.match(/[0-9]+/gi, "");
        var matServering = document.querySelector(".fa.fa-cutlery").offsetParent.innerText.trim().toLowerCase() == "ja" ? true : false;
        var plass = document.querySelector(".fa.fa-map-marker").offsetParent.innerText.trim();
        var open = true;
        if(plasserIgjen == 0 || registrationLabel == "arrangementet er ikke åpnet for påmelding"){
          open = false;
        }
        var obj = {
          "fullhet": plasserIgjen[0] == 0 ? true : false,
          "registrationLabel": registrationLabel,
          "plasserIgjen": plasserIgjen[0],
          "matServering": matServering,
          "plass": plass,
          "open": open,
        }
        return JSON.stringify(obj);
      });

      res = JSON.parse(res);

      element["registrationLabel"] = res.registrationLabel;
      element["plasserIgjen"] = res.plasserIgjen;
      element["matServering"] = res.matServering;
      element["plass"] = res.plass;
      element["fullhet"] = res.fullhet;
      element["open"] = res.open;

      console.log(temp[i]);

    }
  }

  results.jobs.forEach(e => {
    if(e.position == "FULLTIME") e.position = "fulltid";
    else if (e.position == "PARTTIME") e.position = "deltid";
    else if (e.position == "INTERNSHIP") e.position = "internship";
  })

  Object.keys(results).forEach(e => {
    results[e].forEach(f => {
      if(e == "ifievents"){
        var temp = f.date.split(" - ");
        f.klokkeslett = temp[1].split(":");
        f.americanDate = temp[0].split(".");
        switcharoo(f.americanDate, 0, 1);
        f.americanDate = new Date(f.americanDate);
      }
      else if(e == "jobs"){
        f.americanDate = f.date;
        f.americanDate = f.americanDate.split(".");
        switcharoo(f.americanDate, 0, 1);
        f.americanDate = new Date(f.americanDate);
      }
    })
  })

  fs.writeFileSync('./data.json', JSON.stringify(results));

})();