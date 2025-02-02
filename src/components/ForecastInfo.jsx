import React from "react";
import { useWeatherContext } from "../context/WeatherContext";
import styles from "../styles/Styles.module.css";

function ForecastInfo() {
  const { lastSearchedCity, forecastData, unit } = useWeatherContext();

  if (!lastSearchedCity) {
    return <p>Please search for a city to view the forecast.</p>;
  }

  if (!forecastData) return <p>Loading forecast data...</p>;

  // Format the date using UNIX timestamp
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const weekday = date.toLocaleDateString(undefined, { weekday: 'long' });
    const fullDate = date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    return { weekday, fullDate };
  };

  // Reduce the forecast data to show one entry per day
  const forecastByDay = forecastData?.list?.reduce((acc, day) => {
    const dayDate = formatDate(day.dt).fullDate;
    if (!acc.some(d => formatDate(d.dt).fullDate === dayDate)) {
      acc.push(day);
    }
    return acc;
  }, []);

  // Get the 5-day forecast excluding today
  const forecastFromDay2 = forecastByDay?.slice(0, 6);

  return (
    <div className={styles.forecast_info}>
      {forecastFromDay2?.map((day, index) => {
        const { weekday, fullDate } = formatDate(day.dt);
        return (
          <div key={index} className={styles.forecast_card}>
            <div className={styles.forecast_card_header}>
              <p><strong>{weekday}</strong></p>
              <p>{fullDate}</p>
            </div>
            {day.weather[0].icon ? (
              <img
                src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt={day.weather[0].description}
              />
            ) : (
              <img
                src="https://via.placeholder.com/50" // Fallback icon if no icon available
                alt="No icon available"
              />
            )}
            <p className={styles.forecast_card_desc}>{day.weather[0].description}</p>
            {/* <p className={styles.forecast_card_city}>{lastSearchedCity}</p> */}
            <div className={styles.forecast_card_details}>
              <div>
                <p>{day.main.humidity}%</p>
                <p>{day.wind.speed} {unit === "metric" ? "m/s" : "mph"}</p>
              </div>
              <p className={styles.forecast_card_temp}>{day.main.temp}°{unit === "metric" ? "C" : "F"}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ForecastInfo;