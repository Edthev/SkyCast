const express = require("express");
const dotenv = require("dotenv");
const app = express();
const Minutecast = require("./components/minutecast");
const CitySearch = require("./components/citySearch");
const Mail = require("./components/mail");
const MorningMessage = require("./components/morningMessage");
const NodeCache = require("node-cache");
const cachedLocation = new NodeCache();
const Forecast = require("./components/forecast");
const { default: axios } = require("axios");
dotenv.config();

const PORT = process.env.PORT || 8080;
const MINUTECAST_API_KEY = process.env.MINUTECAST_API_KEY;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const EMAIL_SENDER = process.env.EMAIL_SENDER;
const EMAIL_RECEIVER = process.env.EMAIL_RECEIVER;
const CORE_WEATHER_API_KEY = process.env.CORE_WEATHER_API_KEY;
const LOCATION = process.env.LOCATION;
const localhostURL = "http://localhost:" + PORT;

app.get("/", (req, res) => {
   res.send({
      Status: "Server Online",
      City_Search: localhostURL + "/search",
      Forecast: localhostURL + "/forecast",
      Minutecast: localhostURL + "/minutecast",
   });
});

app.get("/minutecast", async (req, res) => {
   Minutecast(req, res, MINUTECAST_API_KEY, PORT);
});
app.get("/forecast", async (req, res) => {
   Forecast(req, res, CORE_WEATHER_API_KEY, PORT);
});
app.get("/mail", async (req, res) => {
   const SUBJECT = "Weather Minutecast & Forecast";
   try {
      const response = await axios.get(localhostURL + "/minutecast");
      const message = response.data.Data.Message;
      const HTML = `<div>${JSON.stringify(message)}</div>`;
      Mail(SENDGRID_API_KEY, EMAIL_RECEIVER, EMAIL_SENDER, SUBJECT, HTML);
      res.send({ Mail: "Sent" });
   } catch (err) {
      console.log("Error mail:", err);
      const HTML = `<div>${JSON.stringify(err)}</div>`;
      Mail(SENDGRID_API_KEY, EMAIL_RECEIVER, EMAIL_SENDER, SUBJECT, HTML);
      res.send({ Mail: "Err", Error: err });
   }
});

app.get("/search", async (req, res) => {
   CitySearch(req, res, CORE_WEATHER_API_KEY, LOCATION, cachedLocation);
});

app.listen(PORT, () => {
   console.log(`Server Running on ${localhostURL}`);
});

const getMinutecast = async () => {
   try {
      const res = await axios.get(localhostURL + "/minutecast");
      const phrase = res.data.Data.Summary.Phrase;
      const timestamp = new Date();
      if (res.data.Status == 200) {
         console.log(phrase + " | " + timestamp);
         const HTML = res.data.Data.Summary.Phrase;
         const SUBJECT = "Minutecast";
         if (HTML !== "No precipitation for at least 120 min ") {
            Mail(SENDGRID_API_KEY, EMAIL_RECEIVER, EMAIL_SENDER, SUBJECT, HTML);
         }
      } else {
         const HTML = res.data.Data.Message;
         const SUBJECT = "Minutecast";
         Mail(SENDGRID_API_KEY, EMAIL_RECEIVER, EMAIL_SENDER, SUBJECT, HTML);
      }
   } catch (err) {
      return "err";
   }
};

const getMorningMessage = async (req, res) => {
   const HTML = await MorningMessage(axios, localhostURL);
   const SUBJECT = "Weather Minutecast & Forecast";
   Mail(SENDGRID_API_KEY, EMAIL_RECEIVER, EMAIL_SENDER, SUBJECT, HTML);
};
getMorningMessage();
getMinutecast();
setInterval(async () => {
   getMorningMessage();
}, 24 * 60 * 60 * 1000);
setInterval(async () => {}, 120 * 1000);
