import { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = ({curCountries, handleMore}) => {
  if (curCountries.length > 10) {
    return (
      <p>too many matches.</p>
    )
  }

  if (curCountries.length === 1) {
    const country = curCountries[0]
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p> Capital: {country.capital}</p>
        <p> Area: {country.area}</p>
        <h2>Languages:</h2>
        <ul>
          {Object.entries(country.languages).map(([key, l]) =>
            <li key={key}>{l}</li>)}
        </ul>
        <img src={country.flags.png} />
      </div>
    )
  }

  return (
    <div>
        {curCountries.map(c => 
          <><p>{c.name.common}</p><button onClick={() => handleMore(c)}>Show More</button><br></br></>
        )}
    </div>
  )
}

const Weather = ({temp,condition,windspeed}) => {
  console.log(temp);
  
  return (
    <div>
      <p>Temperature: {temp}</p>
      <img src={condition[1]}></img>
      <p>Wind speed: {windspeed}</p>
    </div>
  )
}

function App() {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [initialCountries, setInitialCountries] = useState([])
  const API_URL = 'https://studies.cs.helsinki.fi/restcountries/api/all'
  const WEATHER_URL = 'http://api.weatherapi.com/v1'
  const WEATHER_KEY = import.meta.env.VITE_SOME_KEY
  const [weatherObject, setWeather] = useState(null)

  useEffect( () => {
    axios
      .get(API_URL)
      .then( (response) => {
        setInitialCountries(response.data)
      })
  },[])

  useEffect( () => {
    if (countries.length === 1) {
      axios
        .get(`${WEATHER_URL}/current.json`, {
          params: {
            key: WEATHER_KEY,
            q: `${countries[0].capital}`
          }
        })
        .then( (response) => {
          setWeather( response.data )
          console.log( response.data )
        })
    }
  }
  ,[countries])

  const inputChange = (event) => {
    setValue(event.target.value)
    if (!initialCountries) {return}
    setCountries(initialCountries.filter( c => c.name.common.toLowerCase().includes ( event.target.value.toLowerCase() )))
  }

  const handleMore = (country) => {
    setValue(country.name.common)
    setCountries([country])
  }

  return (
    <div>
      Find country:<input value={value} onChange={inputChange}></input>
      <Countries curCountries={countries} handleMore = {handleMore} />
      {console.log(`${countries.length}${weatherObject}`)}
      { (countries.length === 1 && weatherObject !== null) ?
        <Weather
          temp={weatherObject.current.temp_c}
          windspeed={weatherObject.current.wind_kph}
          condition={Object.values(weatherObject.current.condition)}
        /> : <></>
      }
      <footer>
        <a href="https://www.weatherapi.com/" title="Free Weather API"><img src='//cdn.weatherapi.com/v4/images/weatherapi_logo.png' alt="Weather data by WeatherAPI.com" border="0"></img></a>
      </footer>
    </div>
  )
}

export default App