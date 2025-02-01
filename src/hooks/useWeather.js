import { useQuery } from "@tanstack/react-query";
import { fetchFiveDayForecast, fetchWeather } from "../utils/weatherUtils.js"; // Import the fetchWeather function

// Custom hook for fetching weather using React Query
export const useWeather = (city) => {
  const weatherQuery = useQuery({
    queryKey: ["weather", city],
    queryFn: () => fetchWeather(city),
    enabled: !!city, // Only fetch if city is provided
    onError: (error) => {
      console.error("Weather query error:", error.message);
    },
  });

  const forecastQuery = useQuery({
    queryKey: ["forecast", city],
    queryFn: () => fetchFiveDayForecast(city),
    enabled: !!city, // Only fetch if city is provided
    onError: (error) => {
      console.error("Forecast query error:", error.message);
    },
  });

  // Check if both weather and forecast are loading or successful
  const isLoading = weatherQuery.isLoading || forecastQuery.isLoading;
  const isError = weatherQuery.isError || forecastQuery.isError;

  return {
    weather: weatherQuery,
    forecast: forecastQuery,
    isLoading,
    isError,
  };
};
