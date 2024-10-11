const morningMessage = async (axios, localhostURL, Mail) => {
   try {
      // api call to forecast
      let res = await axios.get(`${localhostURL}/forecast`);
      console.log(res.data);
      res = res.data.Data;
      const headline = res.DailyForecasts[0].Day.LongPhrase;
      const dailyHigh =
         res.DailyForecasts[0].Temperature.Maximum.Value +
         res.DailyForecasts[0].Temperature.Maximum.Unit;
      const dailyLow =
         res.DailyForecasts[0].Temperature.Minimum.Value +
         res.DailyForecasts[0].Temperature.Minimum.Unit;
      const realFeelHigh =
         res.DailyForecasts[0].RealFeelTemperature.Minimum.Value +
         res.DailyForecasts[0].RealFeelTemperature.Minimum.Unit +
         " " +
         res.DailyForecasts[0].RealFeelTemperature.Minimum.Phrase;
      const realFeelLow =
         res.DailyForecasts[0].RealFeelTemperature.Minimum.Value +
         res.DailyForecasts[0].RealFeelTemperature.Minimum.Unit +
         " " +
         res.DailyForecasts[0].RealFeelTemperature.Minimum.Phrase;
      let sunrise = res.DailyForecasts[0].Sun.Rise;
      sunrise = sunrise.slice(11, -9) + "AM";
      let sunset = res.DailyForecasts[0].Sun.Set;
      let pm = parseInt(sunset.slice(11, 13)) - 12;
      sunset = "0" + pm + sunset.slice(13, -9) + "PM";
      const airQuality = res.DailyForecasts[0].AirAndPollen[0].Category;
      const grassPollen = res.DailyForecasts[0].AirAndPollen[1].Category;
      const moldPollen = res.DailyForecasts[0].AirAndPollen[2].Category;
      const ragweedPollen = res.DailyForecasts[0].AirAndPollen[3].Category;
      const treePollen = res.DailyForecasts[0].AirAndPollen[4].Category;
      const uvIndex = res.DailyForecasts[0].AirAndPollen[5].Category;
      const wind =
         res.DailyForecasts[0].Day.Wind.Speed.Value +
         " " +
         res.DailyForecasts[0].Day.Wind.Speed.Unit;
      const rain = res.DailyForecasts[0].Day.Rain.Value + res.DailyForecasts[0].Day.Rain.Unit;
      const snow = res.DailyForecasts[0].Day.Snow.Value + res.DailyForecasts[0].Day.Snow.Unit;
      // get important info
      const timestamp = new Date();
      return `<h2>Forecast ${timestamp}:</h2>
      <b>Headline:</b>${headline}<div>
      <b>Daily High and Low:</b> ${dailyHigh + " " + dailyLow}<div>
      <b>Feels Like High and Low:</b> ${realFeelHigh + " " + realFeelLow}<div>
      <div><b>Sunrise and Sunset:</b> ${sunrise + " " + sunset}<div>
      <div><b>Air Quality:</b> ${airQuality}<div>
      <div><b>UV Index:</b> ${uvIndex}<div>
      <b>Rain: </b> ${rain}<div>
      <b>Snow:</b> ${snow}<div>
      <b>Wind:</b> ${wind}
      <h3>Pollen:</h3>
         Grass: ${grassPollen}<div>
         Mold:${moldPollen}<div>
         Ragweed:${ragweedPollen}<div>
         Tree:${treePollen}<div`;
   } catch (err) {
      console.error(err);
      return "Error";
   }
};
module.exports = morningMessage;
