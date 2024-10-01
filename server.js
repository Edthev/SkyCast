const express = require("express");
const dotenv = require("dotenv");
const app = express();
const Minutecast = require("./components/minute");
dotenv.config();

const PORT = process.env.PORT || 8080;
const MINUTECAST_API_KEY = process.env.MINUTECAST_API_KEY;
const CORD_LAT = process.env.CORD_LAT;
const CORD_LONG = process.env.CORD_LONG;

app.get("/", (req, res) => {
   res.send("Server Online");
});

app.get("/minutecast", async (req, res) => {
   Minutecast(req, res, MINUTECAST_API_KEY, CORD_LAT, CORD_LONG);
});

app.listen(PORT, () => {
   console.log(`Server Running on http://localhost:${PORT}`);
});
