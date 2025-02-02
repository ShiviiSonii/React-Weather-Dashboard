import axios from "axios";

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Fetch current weather data using Axios
export const fetchWeather = async (city, unit) => {
  try {
    // Making a GET request to fetch current weather data for the given city and unit
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city, // City name
        units: unit, // Temperature unit (metric/imperial)
        appid: WEATHER_API_KEY,
      },
    });
    return response.data; // Returning the weather data
  } catch (error) {
    // Throwing an error in case of failure
    throw new Error("Weather fetch failed: " + error.message);
  }
};

// Fetch 5-day forecast data using Axios
export const fetchFiveDayForecast = async (city, unit) => {
  try {
    // Making a GET request to fetch 5-day weather forecast data for the given city and unit
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city, // City name
        units: unit, // Temperature unit (metric/imperial)
        appid: WEATHER_API_KEY,
      },
    });
    return response.data; // Returning the forecast data
  } catch (error) {
    // Throwing an error in case of failure
    throw new Error("Forecast fetch failed: " + error.message);
  }
};
