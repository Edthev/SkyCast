const { default: axios } = require("axios");

const forecast = async (req, res, API_KEY, LOCATION_KEY) => {
   try {
      const rs = await axios.get(
         `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${LOCATION_KEY}?apikey=${API_KEY}&details=true&metric=false`
      );
      console.log("forecast success:", rs.status);
      res.send({ Status: rs.status, Data: rs.data });
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
