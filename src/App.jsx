import './App.css'
import ForecastInfo from './components/ForecastInfo.jsx'
import Header from './components/Header.jsx'
import SearchInput from './components/SearchInput.jsx'
import WeatherInfo from './components/WeatherInfo.jsx'
import styles from "./styles/Styles.module.css"

function App() {
  return (
    <div className={styles.container}>
      <Header/>
      <div className={styles.weather_container}>
        <div className={styles.weather_container_info}>
          <SearchInput/>
          <WeatherInfo/>
        </div>
        <ForecastInfo/>
      </div>
    </div>
  )
}

export default App
