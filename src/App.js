import "./App.css";
import Search from "./components/search/search";
import Current_weather from "./components/current_weather/current_weather";
import Forecast from "./components/forecast/forecast";
import { weather_api_key, weather_api_url } from "./api";
import { useState } from "react";

function App() {
  const [currentweather, setcurrentweather] = useState(null);
  const [forecast, setforecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    const current_weather_fetch = fetch(
      `${weather_api_url}/weather?lat=${lat}&lon=${lon}&appid=${weather_api_key}&units=metric`
    );
    const forecast_fetch = fetch(
      `${weather_api_url}/forecast?lat=${lat}&lon=${lon}&appid=${weather_api_key}&units=metric`
    );
    Promise.all([current_weather_fetch, forecast_fetch])
      .then(async (response) => {
        const weatherresponse = await response[0].json();
        const forecastresponse = await response[1].json();

        setcurrentweather({ city: searchData.label, ...weatherresponse });
        setforecast({ city: searchData.label, ...forecastresponse });
      })
      .catch((err) => console.log(err));
  };

  console.log(currentweather);
  console.log(forecast);

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentweather && <Current_weather data={currentweather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
