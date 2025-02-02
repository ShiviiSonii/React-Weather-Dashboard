import { useQuery } from "@tanstack/react-query";
import { fetchWeather, fetchFiveDayForecast } from "../utils/weatherUtils";

// Custom hook for fetching weather and forecast using React Query
export const useWeather = (city, unit) => {
  // Query to fetch current weather data
  const weatherQuery = useQuery({
    queryKey: ["weather", city, unit], // Unique query key to identify the weather data
    queryFn: () => fetchWeather(city, unit), // Function to fetch the weather data
    enabled: !!city, // Only fetch if city is provided
    refetchInterval: 30000, // Poll every 30 seconds
    onError: (error) => {
      console.error("Weather query error:", error.message); // Log any errors from the weather query
    },
  });

  // Query to fetch 5-day forecast data
  const forecastQuery = useQuery({
    queryKey: ["forecast", city, unit], // Unique query key to identify the forecast data
    queryFn: () => fetchFiveDayForecast(city, unit), // Function to fetch the forecast data
    enabled: !!city, // Only fetch if city is provided
    refetchInterval: 30000, // Poll every 30 seconds
    onError: (error) => {
      console.error("Forecast query error:", error.message); // Log any errors from the forecast query
    },
  });

  // Combine loading states from both queries
  const isLoading = weatherQuery.isLoading || forecastQuery.isLoading;
  // Combine error states from both queries
  const isError = weatherQuery.isError || forecastQuery.isError;

  // Return the results and loading/error states
  return {
    weather: weatherQuery,
    forecast: forecastQuery,
    isLoading,
    isError,
  };
};
