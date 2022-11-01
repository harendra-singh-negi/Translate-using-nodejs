const translate = require("translate-google");
const express = require("express");
const app = express();
app.use(express.json());
const say = require("say");

app.get("/", function (req, res) {
  res.send("welcome");
});
app.get("/json", function (req, res) {
  const { text, lang } = req.query;
  translate(text, { to: lang })
    .then((resonce) => {
      res.status(200).send(resonce);
    })
    .catch((err) => {
      res.status(403).send(err);
    });
});
app.post("/translate", function (req, res) {
  const { text, lang } = req.body;
  translate(text, { to: lang })
    .then((resonce) => {
      res.status(200).send(resonce);
    })
    .catch((err) => {
      res.status(403).send(err);
    });
});
app.get("/speek", function (req, res) {
  const { text, lang } = req.query;
  translate(text, { to: lang })
    .then((resonce) => {
      say.speak(resonce);
      say.stop();
      res.status(200).send(resonce);
    })
    .catch((err) => {
      res.status(403).send(err);
    });
});

app.listen(41500, () => {});
