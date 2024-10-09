const { default: axios } = require("axios");
const minute = async (req, res, KEY, PORT) => {
   try {
      const searchRequest = await axios.get(`http://localhost:${PORT}/search`);
      const CORDS = searchRequest.data.Cords;
      const response = await axios.get(
         `http://dataservice.accuweather.com/forecasts/v1/minute?q=${CORDS}&apikey=${KEY}`
      );
      console.log("minutecast success:", response.status);
      res.send({ Status: response.status, Data: response.data });
   } catch (err) {
      if (err.response) {
         console.log("minutecast err:", err.response.status);
         res.send({ Status: err.response.status, Data: err.response.data });
      } else {
         console.log(err);
         res.send({ ERROR: err });
      }
   }
};
module.exports = minute;
