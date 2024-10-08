const express = require("express");
const dotenv = require("dotenv");
const app = express();
const Minutecast = require("./components/minutecast");
const CitySearch = require("./components/citySearch");
const NodeCache = require("node-cache");
const cachedLocation = new NodeCache();
const Forecast = require("./components/forecast");
const { default: axios } = require("axios");
dotenv.config();

const PORT = process.env.PORT || 8080;
const MINUTECAST_API_KEY = process.env.MINUTECAST_API_KEY;
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

app.get("/search", async (req, res) => {
   CitySearch(req, res, CORE_WEATHER_API_KEY, LOCATION, cachedLocation);
});

app.listen(PORT, () => {
   console.log(`Server Running on ${localhostURL}`);
});

const getMinutecast = async () => {
   const res = await axios.get(localhostURL + "/minutecast");
   const phrase = res.data.Data.Summary.Phrase;
   console.log(phrase);
};
getMinutecast();
setInterval(async () => {
   getMinutecast();
}, 120 * 60 * 1000);
