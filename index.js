const express = require("express");
const cors = require("cors");
const gTTS = require("gtts");
const moment = require("moment");
const app = express();

// Dot env
require("dotenv").config();

// Static files
app.use(express.static("public"));

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/tts", (req, res) => {
  console.log(req.body);
  const text = req.body.text;
  const lang = req.body.lang || "en";
  const gtts = new gTTS(text, lang);
  const filename = `public/${moment().format("YYYYMMDD_HHmmss")}.mp3`;
  gtts.save(filename, function (err, result) {
    if (err) {
      return res.status(500).send(err);
    }
    res.download(filename);
  });
});

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(
    `App listening at https://${process.env.HOST}:${process.env.PORT}`
  );
});
