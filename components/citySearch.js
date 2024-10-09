const { default: axios } = require("axios");

const citySearch = async (req, res, KEY, LOCATION, cachedLocation) => {
   try {
      const cachedLocationKey = cachedLocation.get("LocationKey");
      const cachedCords = cachedLocation.get("Cords");
      if (!cachedLocationKey && !cachedCords) {
         const ENCODED_LOCATION = LOCATION.replace(/  /g, "%20");
         const response = await axios.get(
            `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${KEY}&q=${ENCODED_LOCATION}`
         );
         console.log("Location Found:", Array(response.data).length);
         const cityKey = response.data[0].Key;
         const cityLat = response.data[0].GeoPosition.Latitude;
         const cityLong = response.data[0].GeoPosition.Longitude;
         const ENCODED_CORDS = `${cityLat}%2C${cityLong}`;
         cachedLocation.mset([
            { key: "LocationKey", val: cityKey },
            { key: "Cords", val: ENCODED_CORDS },
         ]);
         res.send({
            Status: response.status,
            Location: cityKey,
            Cords: ENCODED_CORDS,
            Data: response.data,
         });
      } else {
         console.log("retreiving location key from cache");
         res.send({ Location: cachedLocationKey, Cords: cachedCords });
      }
   } catch (err) {
      if (err.status == 503) {
         console.log("err status", 503, err.response.data);
         res.send({ Error: err.response.data.Message });
      } else {
         console.error("Search Error:", err);
         res.send({ ERROR: err });
      }
   }
};
module.exports = citySearch;
