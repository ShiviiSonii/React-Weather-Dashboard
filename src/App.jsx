import './App.css'
import ForecastInfo from './components/ForecastInfo.jsx'
import Header from './components/Header.jsx'
import SearchInput from './components/SearchInput.jsx'
import WeatherInfo from './components/WeatherInfo.jsx'
import { useWeatherContext } from './context/WeatherContext.jsx'
import styles from "./styles/Styles.module.css"

function App() {
  // Destructuring 'lastSearchedCity' from the WeatherContext
  const { lastSearchedCity } = useWeatherContext();

  return (
    <div className={styles.container}>
      {/* Header component that displays the main app heading and today's date*/}
      <Header/>
      <div className={styles.weather_container}>
        <div className={styles.weather_container_info}>
          {/* SearchInput component allows users to search for a city */}
          <SearchInput/>
          
          {/* Display WeatherInfo component only if 'lastSearchedCity' exists */}
          {lastSearchedCity && <WeatherInfo/>}
        </div>
        
        {/* Display ForecastInfo component if there is a city to show the forecast */}
        {lastSearchedCity && <ForecastInfo/>}
      </div>
    </div>
  )
}

export default App
