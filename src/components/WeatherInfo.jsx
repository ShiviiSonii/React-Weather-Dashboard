import React from 'react';
import { useWeatherContext } from '../context/WeatherContext';
import styles from "../styles/Styles.module.css"

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
      <div className={styles.weather_info}>
      {icon && (
          <img
            src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={description || 'weather icon'}
          />
        )}
        {description && <h3 className={styles.weather_info_desc}>{description}</h3>}
        {temperature !== null && (
          <h2 className={styles.weather_info_temp}>{temperature} {unit === 'metric' ? '°C' : '°F'}</h2>
        )}
        <button onClick={toggleUnit} className={styles.weather_unit_toggle}>
          Switch to {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
        </button>
        <h2 className={styles.weather_info_city}>{lastSearchedCity}</h2>
        {humidity !== null && <p>Humidity: {humidity}%</p>}
        
        {windSpeed !== null && (
          <p>Wind Speed: {windSpeed} {unit === 'metric' ? 'm/s' : 'mph'}</p>
        )}
      </div>
        <h2 className={styles.city_name}>{lastSearchedCity}</h2>
        <p className={styles.city_desc}>Lorem ipsum aspernatur aperiam veritatis <br/> earum magnam dolor libero sequi est in, voluptate</p>
      </div>
  );
}

export default WeatherInfo;
