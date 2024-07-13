// src/components/WeatherDisplay.js
import React from 'react';

const WeatherDisplay = ({ weather }) => {
  const iconUrl = `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`;

  return (
    <div className="weather-display">
      <h3>{weather.name}</h3>
      <img src={iconUrl} alt={weather.weather[0].description} />
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Conditions: {weather.weather[0].description}</p>
      <p>Wind Speed: {weather.wind.speed} m/s</p>
      <p>Pressure: {weather.main.pressure} hPa</p>
    </div>
  );
};

export default WeatherDisplay;
