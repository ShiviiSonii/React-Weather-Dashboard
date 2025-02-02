import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { WeatherProvider } from "./context/WeatherContext.jsx"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Creating a new QueryClient instance for react-query
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Wrapping the app with QueryClientProvider to enable react-query for data fetching */}
    <QueryClientProvider client={queryClient}>
      {/* Wrapping the app with WeatherProvider to provide weather-related data context */}
      <WeatherProvider>
        <App />
      </WeatherProvider>
    </QueryClientProvider>
  </StrictMode>,
)
