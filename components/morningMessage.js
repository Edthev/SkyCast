const morningMessage = async (axios, localhostURL, Mail) => {
   try {
      // api call to forecast
      let res = await axios.get(`${localhostURL}/forecast`);
      console.log(res.data);
      res = res.data.Data;
      const headline = res.Headline.Text;
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
      const sunrise = res.DailyForecasts[0].Sun.Rise;
      const sunset = res.DailyForecasts[0].Sun.Set;
      const airQuality = res.DailyForecasts[0].AirAndPollen[0].Category;
      const grassPollen = res.DailyForecasts[0].AirAndPollen[1].Category;
      const moldPollen = res.DailyForecasts[0].AirAndPollen[2].Category;
      const ragweedPollen = res.DailyForecasts[0].AirAndPollen[3].Category;
      const treePollen = res.DailyForecasts[0].AirAndPollen[4].Category;
      const uvIndex = res.DailyForecasts[0].AirAndPollen[5].Category;

      // get important info
      const timestamp = new Date();
      return `<h2>Forecast ${timestamp}:</h2>
      <b>Headline:</b>${headline}<div>
      <b>Daily High and Low:</b> ${dailyHigh + " " + dailyLow}<div>
      <b>Feels Like High and Low:</b> ${realFeelHigh + " " + realFeelLow}<div>
      <div><b>Sunrise and Sunset:</b> ${sunrise + " " + sunset}<div>
      <div><b>Air Quality:</b> ${airQuality}<div>
      <div><b>UV Index:</b> ${uvIndex}<div>
      <div><b>Pollen:</b><div>   Grass: ${grassPollen}<div>   Mold:${moldPollen}<div>   Ragweed:${ragweedPollen}<div>   Tree:${treePollen}
      `;
   } catch (err) {
      console.error(err);
      return "Error";
   }
};
module.exports = morningMessage;
