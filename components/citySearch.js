const { default: axios } = require("axios");

const citySearch = async (req, res, KEY, LOCATION, cachedLocation) => {
   try {
      const cachedLocationKey = cachedLocation.get("LocationKey");
      if (!cachedLocationKey) {
         const ENCODED_LOCATION = LOCATION.replace(/  /g, "%20");
         const response = await axios.get(
            `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${KEY}&q=${ENCODED_LOCATION}`
         );
         console.log("Location Found:", Array(response.data).length);
         const cityKey = response.data[0].Key;
         cachedLocation.set("LocationKey", cityKey);
         res.send({
            Status: response.status,
            Location: cityKey,
            Data: response.data,
         });
      } else {
         console.log("retreiving location key from cache");
         res.send({ Location: cachedLocationKey });
      }
   } catch (err) {
      console.error(err);
      res.send({ ERROR: err });
   }
};
module.exports = citySearch;
