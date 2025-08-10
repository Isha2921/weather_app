import React, { useState } from "react";
import axios from "axios";
import "./Weather.css"; 

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const API_KEY = "e7a01de3974eb304272705ff1cf3d059";

  const fetchWeather = async () => {
    if (city.trim() === "") {
      alert("Please enter a city name");
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("City not found. Please try again.");
      } else {
        alert("An error occurred while fetching weather data.");
      }
    }
  };

  return (
    <div className="weather-container">
      <h1 className="title">Weather App</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {weather && (
  <div className="weather-info">
    <h2>{weather.name}, {weather.sys.country}</h2>
    <p>{weather.main.temp}°C</p>
    <p>{weather.weather[0].description}</p>
    <p>Humidity: {weather.main.humidity}%</p>
    <p>Wind Speed: {weather.wind.speed} m/s</p>
  </div>
)}
    </div>
  );
}

export default Weather;
