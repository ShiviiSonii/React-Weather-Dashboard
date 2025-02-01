import { useQuery } from "@tanstack/react-query";
import { fetchWeather, fetchFiveDayForecast } from "../utils/weatherUtils"; // Import the fetch functions

// Custom hook for fetching weather and forecast using React Query
export const useWeather = (city, unit) => {
  const weatherQuery = useQuery({
    queryKey: ["weather", city, unit],
    queryFn: () => fetchWeather(city, unit),
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

  const isLoading = weatherQuery.isLoading || forecastQuery.isLoading;
  const isError = weatherQuery.isError || forecastQuery.isError;

  return {
    weather: weatherQuery,
    forecast: forecastQuery,
    isLoading,
    isError,
  };
};
