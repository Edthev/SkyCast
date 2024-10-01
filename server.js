const express = require("express");
const dotenv = require("dotenv");
const app = express();
const Minutecast = require("./components/minutecast");
const Forecast = require("./components/forecast");
dotenv.config();

const PORT = process.env.PORT || 8080;
const MINUTECAST_API_KEY = process.env.MINUTECAST_API_KEY;
const CORE_WEATHER_API_KEY = process.env.CORE_WEATHER_API_KEY;
const CORD_LAT = process.env.CORD_LAT;
const CORD_LONG = process.env.CORD_LONG;
const LOCATION_KEY = process.env.LOCATION_KEY;

app.get("/", (req, res) => {
   const r = "http://localhost:" + PORT;
   res.send({
      Status: "Server Online",
      Minutecast: r + "/minutecast",
      Forecast: r + "/forecast",
   });
});

app.get("/minutecast", async (req, res) => {
   Minutecast(req, res, MINUTECAST_API_KEY, CORD_LAT, CORD_LONG);
});
app.get("/forecast", async (req, res) => {
   Forecast(req, res, CORE_WEATHER_API_KEY, LOCATION_KEY);
});

app.listen(PORT, () => {
   console.log(`Server Running on http://localhost:${PORT}`);
});
