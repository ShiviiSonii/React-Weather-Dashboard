import React, { createContext, useContext, useState, useEffect } from 'react';
import { useWeather } from '../hooks/useWeather'; // Import the useWeather hook

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [lastSearchedCity, setLastSearchedCity] = useState(localStorage.getItem('lastCity') || '');
  const [unit, setUnit] = useState('metric'); // Default to Celsius

  const { weather, forecast, isLoading, isError } = useWeather(lastSearchedCity, unit);

  const setWeather = (_, city) => {
    setLastSearchedCity(city);
    localStorage.setItem('lastCity', city); // Store the city in localStorage
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'metric' ? 'imperial' : 'metric'));
  };

  useEffect(() => {
    // Optionally, trigger the weather and forecast fetching on component mount
    if (lastSearchedCity) {
      setWeather(weather.data, lastSearchedCity);
    }
  }, [lastSearchedCity, weather]);

  return (
    <WeatherContext.Provider
      value={{
        weatherData: weather?.data,
        forecastData: forecast?.data,
        lastSearchedCity,
        setWeather,
        toggleUnit,
        unit,
        isLoading,
        isError,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherContext = () => {
  return useContext(WeatherContext);
};
