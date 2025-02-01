import axios from "axios";

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Fetch current weather data using Axios
export const fetchWeather = async (city, unit) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        units: unit,
        appid: WEATHER_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Weather fetch failed: " + error.message);
  }
};

// Fetch 5-day forecast data using Axios
export const fetchFiveDayForecast = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: WEATHER_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Forecast fetch failed: " + error.message);
  }
};
