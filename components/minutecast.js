const { default: axios } = require("axios");
const { response } = require("express");
const minute = async (req, res, KEY, LAT, LONG) => {
   try {
      const response = await axios.get(
         `http://dataservice.accuweather.com/forecasts/v1/minute?q=${LAT}%2C%20${LONG}&apikey=${KEY}`
      );
      console.log("minutecast success:", response.status);
      res.send({ Status: response.status, Data: response.data });
   } catch (err) {
      if (err.response) {
         console.log("minutecast err:", err.response.status);
         res.send({ ERROR: err.response.status, Data: err.response.data });
      } else {
         console.log(err);
         res.send({ ERROR: err });
      }
   }
};
module.exports = minute;
