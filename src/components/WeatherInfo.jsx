import React from 'react';
import { useWeatherContext } from '../context/WeatherContext';

function WeatherInfo() {
  const { weatherData, lastSearchedCity, toggleUnit, unit } = useWeatherContext();

  // Safely access weatherData and its properties
  const temperature = weatherData?.main?.temp ?? null;
  const humidity = weatherData?.main?.humidity ?? null;
  const windSpeed = weatherData?.wind?.speed
    ? unit === 'metric'
      ? weatherData.wind.speed // m/s
      : (weatherData.wind.speed * 2.237).toFixed(2) // Convert from m/s to mph
    : null;
  const description = weatherData?.weather?.[0]?.description ?? null;
  const icon = weatherData?.weather?.[0]?.icon ?? null;

  if (!weatherData) return <p>Loading weather data...</p>;

  return (
    <div>
      <h3>Weather Information for {lastSearchedCity}</h3>
      <button onClick={toggleUnit}>
        Switch to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
      </button>
      
      {temperature !== null && (
        <p>Temperature: {temperature} {unit === 'metric' ? '°C' : '°F'}</p>
      )}
      
      {humidity !== null && <p>Humidity: {humidity}%</p>}
      
      {windSpeed !== null && (
        <p>Wind Speed: {windSpeed} {unit === 'metric' ? 'm/s' : 'mph'}</p>
      )}
      
      {description && <p>Condition: {description}</p>}
      
      {icon && (
        <img
          src={`http://openweathermap.org/img/wn/${icon}.png`}
          alt={description || 'weather icon'}
        />
      )}
    </div>
  );
}

export default WeatherInfo;
