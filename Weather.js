// src/components/Weather.js
import React, { useState, useEffect } from 'react';
import WeatherForm from './WeatherForm';
import WeatherDisplay from './WeatherDisplay';
import axios from 'axios';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [defaultWeather, setDefaultWeather] = useState([]);
  const defaultCities = ['New York', 'London', 'Tokyo'];

  useEffect(() => {
    fetchDefaultWeather(defaultCities);
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
      fetchWeather(lastCity);
    }
  }, []);

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=224d96897def77f10f432332e4b69905&units=metric`);
      setWeatherData(response.data);
      localStorage.setItem('lastCity', city);
    } catch (error) {
      setError('City not found');
    } finally {
      setLoading(false);
    }
  };

  const fetchDefaultWeather = async (cities) => {
    setLoading(true);
    setError(null);
    try {
      const responses = await Promise.all(cities.map(city =>
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=224d96897def77f10f432332e4b69905&units=metric`)
      ));
      setDefaultWeather(responses.map(response => response.data));
    } catch (error) {
      setError('Failed to fetch default city weather');
    } finally {
      setLoading(false);
    }
  };

  const refreshDefaultWeather = () => {
    fetchDefaultWeather(defaultCities);
  };

  return (
    <div>
      <h2>Weather in Major Cities</h2>
      <button onClick={refreshDefaultWeather}>Refresh</button>
      <div className="default-weather">
        {defaultWeather.map((weather, index) => (
          <WeatherDisplay key={index} weather={weather} />
        ))}
      </div>
      <WeatherForm fetchWeather={fetchWeather} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weatherData && <WeatherDisplay weather={weatherData} />}
    </div>
  );
};

export default Weather;
