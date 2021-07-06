import admin from "firebase-admin";
import fs from "fs";

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
async function pushToFirestore(){
  var db = admin.firestore();
  var dataRaw = fs.readFileSync("./crawler/data.json");
  var dataRawParsed = JSON.parse(dataRaw);
  dataRawParsed = dataRawParsed.jobs;
  var settInnHistorikk = {};

  //Pusher vi ny data til database
  console.log("kjører innleggelse");
  for(let i = 0; i < dataRawParsed.length; i++){
    //Sjekk om dokumentet finnes
    console.log(dataRawParsed[i].id)
    var jobb = await db.collection("jobs").doc(dataRawParsed[i].id).get();
    settInnHistorikk[dataRawParsed[i].id] = true;
    console.log(jobb.exists);

    if(jobb.exists == true){
      var jobbData = jobb.data();
      console.log("den finnes fra før, overskriver");
      // console.log(jobbData);
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
      },
      {merge: true})
    }
    else if(jobb.exists == false){
      await db.collection("jobs").doc(dataRawParsed[i].id).set(dataRawParsed[i]);
      console.log("den er ny, legger til");
      console.log(jobbData)
    }
  }

  //Fjerner det som ikke ble oppdatert eller lagt til 
  var keys = Object.keys(settInnHistorikk);
  console.log("FERDIG");
  console.log(settInnHistorikk);

  for(let i = 0; i < keys.length; i++){
    var bleDetLagtTil = await db.collection("jobs").doc(keys[i]).get();
    console.log(keys[i]);
    console.log()
    if(bleDetLagtTil.exists == false){
      console.log("den ble IKKE LAGT TIL TIDLIGERE, fjern den");
      console.log()
      await db.collection("jobs").doc(keys[i]).delete()
    }
    else{
      console.log("den ble lagt til fortsett");
    }
  }
}

pushToFirestore();