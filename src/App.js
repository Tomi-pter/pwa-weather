import { useState } from "react";
import { fetchWeather } from "./api/apiFetchWeather";

function App() {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (e) => {
    e.preventDefault();
    try {
      const { data } = await fetchWeather(cityName);
      setWeatherData(data);
      console.log(data);
      setCityName("");
      setError(null);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    }
  };

  return (
    <div>
      <form onSubmit={fetchWeatherData}>
        <input
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit">Get Weather</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weatherData?.location && (
        <div>
          <h2>{weatherData.location.name}</h2>
          <p>{weatherData.location.country}</p>
          <p>Local Time: {weatherData.location.localtime}</p>
          <p>Latitude: {weatherData.location.lat}</p>
          <p>Longitude: {weatherData.location.lon}</p>
          {weatherData.current && (
            <div>
              <p>Temperature: {weatherData.current.temp_c}°C</p>
              <p>Condition: {weatherData.current.condition.text}</p>
              <img
                src={weatherData.current.condition.icon}
                alt={weatherData.current.condition.text}
              />
              <p>Humidity: {weatherData.current.humidity}%</p>
              <p>Pressure: {weatherData.current.pressure_mb} mb</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
