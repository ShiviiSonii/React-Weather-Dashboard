import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchWeather, fetchFiveDayForecast } from '../utils/weatherUtils'; // Import forecast function

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null); // New state for forecast data
  const [lastSearchedCity, setLastSearchedCity] = useState(localStorage.getItem('lastCity') || '');
  const [unit, setUnit] = useState('metric'); // Default to Celsius
  const [error, setError] = useState(null); // New state for error handling

  const setWeather = (data, city) => {
    setWeatherData(data);
    setLastSearchedCity(city);
    localStorage.setItem('lastCity', city); // Store the city in localStorage
  };

  // Fetch current weather and forecast
  const fetchAndSetWeather = async () => {
    if (lastSearchedCity) {
      try {
        const weatherData = await fetchWeather(lastSearchedCity, unit);
        setWeather(weatherData, lastSearchedCity); // Update weather context
        setError(null); // Reset any previous errors

        const forecastData = await fetchFiveDayForecast(lastSearchedCity);
        setForecastData(forecastData); // Update forecast context
      } catch (error) {
        console.error("Error fetching weather:", error);
        setError("Failed to fetch weather data. Please try again later.");
      }
    }
  };

  useEffect(() => {
    fetchAndSetWeather();
    const intervalId = setInterval(fetchAndSetWeather, 30000); // Poll every 30 seconds
    return () => clearInterval(intervalId);
  }, [lastSearchedCity, unit]); // Run this effect when lastSearchedCity or unit changes

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'metric' ? 'imperial' : 'metric'));
  };

  return (
    <WeatherContext.Provider value={{ weatherData, forecastData, lastSearchedCity, setWeather, toggleUnit, unit, error }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherContext = () => {
  return useContext(WeatherContext);
};
