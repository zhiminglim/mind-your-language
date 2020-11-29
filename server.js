require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const https = require("https");
const mongoose = require("mongoose");
const Word = require("./src/models/Word");

const app = express();
const port = process.env.PORT || 5000;
const mongoURL = process.env.MONGO_URL;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// ------------ START of Database Default Setup ------------ //
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected...")).catch(err => console.log(err));


// ------------ START of Database Default Setup ------------ //


app.get("/", function(req, res) {
  res.send("Hello World");
});

app.get("/wotd/:randomWord", function(req, res) {

  const wordId = req.params.randomWord;



  const app_id = process.env.OD_APP_ID;
  const app_key = process.env.OD_API_KEY;
  const fields = "definitions";
  const strictMatch = "true";

  const options = {
    host: process.env.OD_URL,
    port: '443',
    path: '/api/v2/entries/en-gb/' + wordId + '?fields=' + fields + '&strictMatch=' + strictMatch,
    method: "GET",
    headers: {
      'app_id': app_id,
      'app_key': app_key
    }
  }

  https.get(options, (resp) => {

    let body = '';
    resp.on("data", function(data) {
      body += data;
    });

    resp.on("end", () => {
      let wordData = JSON.parse(body);
      console.log(wordData);

      const wordId = wordData.id;
      const language = wordData.results[0].language;
      const senseDefinitions = [];
      const subsenseDefinition = "";

      const lexEntries = wordData.results[0].lexicalEntries;
      lexEntries.forEach((lexicalEntry) => {
        const entries = lexicalEntry.entries;

        entries.forEach((entry) => {
          const senses = entry.senses;

          senses.forEach((sense) => {
            senseDefinitions.push(sense.definitions[0]);
          })
        })
      })

      const word = new Word({
        word: wordId,
        language: language,
        senseDefinition: senseDefinitions
      });

      word.save();

      res.send(senseDefinitions);
      //res.send(wordData);
    })
  });

});

app.listen(port, function() {
  console.log(`Server is listening on port ${port}`);
})
