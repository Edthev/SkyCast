const { default: axios } = require("axios");

const citySearch = async (req, res, KEY, LOCATION) => {
   try {
      const ENCODED_LOCATION = LOCATION.replace(/  /g, "%20");
      const response = await axios.get(
         `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${KEY}&q=${ENCODED_LOCATION}`
      );
      console.log("Location Found:", Array(response.data).length);
      res.send({ Status: response.status, Location: ENCODED_LOCATION, Data: response.data });
   } catch (err) {
      console.error(err);
      res.send({ ERROR: err });
   }
};
module.exports = citySearch;
