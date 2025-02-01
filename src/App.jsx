import './App.css'
import ForecastInfo from './components/ForecastInfo.jsx'
import SearchInput from './components/SearchInput.jsx'
import WeatherInfo from './components/WeatherInfo.jsx'

function App() {

  return (
    <>
      <SearchInput/>
      <WeatherInfo/>
      <ForecastInfo/>
    </>
  )
}

export default App
