import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try {
      const apiKey = 'f5096926b07d9d08883ce60362a17ce8'; 
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      const data = await response.json();

      if (response.ok) {
        setWeather(data);
        setError(null);
      } else {
        setError(data.message || 'Unknown error');
      }
    } catch (error) {
      setError('Failed to fetch weather data');
    }
  };

  const getTemperatureInFahrenheit = (celsius) => {
    return ((celsius * 9) / 5 + 32).toFixed(2);
  };

  const getWeatherIconUrl = () => {
    if (weather && weather.weather && weather.weather[0] && weather.weather[0].icon) {
      return `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`;
    }
    return null;
  };

  const handleGetWeather = () => {
    if (city !== '') {
      fetchWeather();
    }
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleGetWeather}>Get Weather</button>
      {error && <div className="error">{error}</div>}
      {weather && weather.main && weather.weather && (
        <div className="weather-details">
          <h2>{weather.name}</h2>
          <img src={getWeatherIconUrl()} alt="Weather Icon" />
          <p>Temperature (Celsius): {weather.main.temp} °C</p>
          <p>Temperature (Fahrenheit): {getTemperatureInFahrenheit(weather.main.temp)} °F</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      )}
      {weather && (!weather.main || !weather.weather) && (
        <div className="weather-details">
          <p>Weather data not available for the entered city.</p>
        </div>
      )}
    </div>
  );
}

export default App;
