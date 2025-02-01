import axios from "axios";

// Function for fetching weather data from the API
export const fetchWeather = async (city, unit = "metric") => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}?q=${city}&units=${unit}&appid=${
        import.meta.env.VITE_WEATHER_API_KEY
      }`
    );
    if (data.cod !== 200) {
      throw new Error(data.message || "Error fetching weather data");
    }
    return data;
  } catch (error) {
    console.error("Error in fetchWeather:", error);
    throw new Error("Failed to fetch weather data. Please try again later.");
  }
};

// Function for fetching the five-day forecast
export const fetchFiveDayForecast = async (city, unit = "metric") => {
  try {
    const { data } = await axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${
        import.meta.env.VITE_WEATHER_API_KEY
      }&units=${unit}`
    );
    if (data.cod !== "200") {
      throw new Error(data.message || "Error fetching forecast data");
    }
    return data;
  } catch (error) {
    console.error("Error in fetchFiveDayForecast:", error);
    throw new Error("Failed to fetch forecast data. Please try again later.");
  }
};
