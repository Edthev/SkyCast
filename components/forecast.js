const { default: axios } = require("axios");

const forecast = async (req, res, API_KEY, PORT) => {
   try {
      const searchRequest = await axios.get(`http://localhost:${PORT}/search`);
      const LOCATION_KEY = searchRequest.data.Location;
      const forecastRequest = await axios.get(
         `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${LOCATION_KEY}?apikey=${API_KEY}&details=true&metric=false`
      );
      console.log("forecast success:", forecastRequest.status);
      res.send({ Status: forecastRequest.status, Data: forecastRequest.data });
   } catch (err) {
      if (err.response) {
         console.log("forecast err:", err.response.status);
         res.send({ ERROR: err.response.status, Data: err.response.data });
      } else {
         console.log(err);
         res.send({ ERROR: err });
      }
   }
};
module.exports = forecast;
