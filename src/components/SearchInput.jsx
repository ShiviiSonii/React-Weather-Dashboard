import React, { useState } from 'react';
import { useWeatherContext } from '../context/WeatherContext'; // Import the useWeather hook
import { fetchWeather } from '../utils/weatherUtils.js'; // Fetch weather data function
import styles from "../styles/Styles.module.css"

function SearchInput() {
  const [cityName, setCityName] = useState('');
  const [error, setError] = useState(null); // Add an error state
  const [isLoading, setIsLoading] = useState(false); // Add a loading state
  const { setWeather } = useWeatherContext(); // Get setWeather from context

  const handleSearch = async () => {
    if (!cityName) {
      setError("City name cannot be empty.");
      return;
    }

    setError(null); // Reset error before the new request
    setIsLoading(true); // Set loading to true

    try {
      const data = await fetchWeather(cityName); // Fetch the weather data for the city
      setWeather(data, cityName); // Set the weather data in context
      setCityName(""); // Clear the input field
    } catch (error) {
      setError("Failed to fetch weather. Please try again later."); // Set an error message
      console.error('Error fetching weather:', error);
    } finally {
      setIsLoading(false); // Reset loading state after the request
    }
  };

  return (
    <div className={styles.search_input}>
      <input
        type="text"
        placeholder="Enter city name"
        value={cityName}
        onChange={(e) => {
          setCityName(e.target.value);
          setError(null); // Clear error when the user starts typing again
        }}
        className={styles.input_field}
      />
      <button onClick={handleSearch} disabled={isLoading} className={styles.input_btn}>
        {isLoading ? 'Loading...' : 'Enter'}
      </button>
        
      {error && <p style={{ color: 'red' }}>{error}</p>} 
    </div>
  );
}

export default SearchInput;
