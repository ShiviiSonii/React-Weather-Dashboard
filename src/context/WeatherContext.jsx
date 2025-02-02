import React, { createContext, useContext, useState, useEffect } from 'react';
import { useWeather } from '../hooks/useWeather'; 

// Create a Context for weather-related data
const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  // State to hold the last searched city (from localStorage or default to empty string)
  const [lastSearchedCity, setLastSearchedCity] = useState(localStorage.getItem('lastCity') || '');
  // State to manage the unit (C or F)
  const [unit, setUnit] = useState('metric'); 

  // Fetch weather and forecast data using the custom useWeather hook
  const { weather, forecast, isLoading, isError } = useWeather(lastSearchedCity, unit);

  // Function to update the last searched city and store it in localStorage
  const setWeather = (_, city) => {
    setLastSearchedCity(city);
    localStorage.setItem('lastCity', city); // Store the city in localStorage
  };

  // Function to toggle between metric (Celsius) and imperial (Fahrenheit) units
  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'metric' ? 'imperial' : 'metric'));
  };

  useEffect(() => {
    // Optionally, trigger the weather and forecast fetching when lastSearchedCity is updated
    if (lastSearchedCity) {
      setWeather(weather.data, lastSearchedCity); // Set the new city
    }
  }, [lastSearchedCity, weather]); // Depend on lastSearchedCity and weather data

  return (
    <WeatherContext.Provider
      value={{
        weatherData: weather?.data, // Current weather data
        forecastData: forecast?.data, // 5-day forecast data
        lastSearchedCity, // The last searched city
        setWeather, // Function to set the last searched city
        toggleUnit, // Function to toggle the temperature unit
        unit, // The current unit (Celsius or Fahrenheit)
        isLoading, // Loading state from the weather and forecast queries
        isError, // Error state from the weather and forecast queries
      }}
    >
      {children} {/* Render children components with access to weather context */}
    </WeatherContext.Provider>
  );
};

// Custom hook to access weather context data
export const useWeatherContext = () => {
  return useContext(WeatherContext); // Returns the value of the WeatherContext
};
