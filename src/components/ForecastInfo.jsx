// src/components/ForecastInfo.jsx
import React from "react";
import { useWeatherContext } from "../context/WeatherContext";
import styles from "../styles/Styles.module.css"

function ForecastInfo() {
  const { lastSearchedCity, forecastData, unit } = useWeatherContext();

  if (!lastSearchedCity) {
    return <p>Please search for a city to view the forecast.</p>;
  }

  if (!forecastData) return <p>Loading forecast...</p>;

  // Format the date using UNIX timestamp
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert UNIX timestamp to milliseconds
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options); // Formats the date in a readable format
  };

  // Reduce the forecast data to show one entry per day
  const forecastByDay = forecastData?.list?.reduce((acc, day) => {
    const dayDate = formatDate(day.dt);
    if (!acc.some(d => formatDate(d.dt) === dayDate)) {
      acc.push(day);
    }
    return acc;
  }, []);
  console.log(forecastByDay)

  // Get the 5-day forecast excluding today
  const forecastFromDay2 = forecastByDay?.slice(1, 6);

  return (
    <div>
      <h3>5-Day Weather Forecast for {lastSearchedCity}</h3>
      <div className={styles.forecast_data}>
        {forecastFromDay2?.map((day, index) => (
          <div key={index}>
            <p>{formatDate(day.dt)}</p>
            <p>Temp: {day.main.temp}°{unit === "metric" ? "C" : "F"}</p>
            <p>Humidity: {day.main.humidity}%</p>
            <p>Wind: {day.wind.speed} {unit === "metric" ? "m/s" : "mph"}</p>
            <p>{day.weather[0].description}</p>
            {day.weather[0].icon ? (
              <img
                src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                alt={day.weather[0].description}
              />
            ) : (
              <img
                src="https://via.placeholder.com/50" // Fallback icon if no icon available
                alt="No icon available"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastInfo;
