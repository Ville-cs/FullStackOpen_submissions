import countryWeather from '../services/countryWeather'
import ShowWeather from './ShowWeather'
import { useState, useEffect } from 'react'

const CountryInfo = ({ filteredList }) => {
  const [weather, setWeather] = useState(null)
  let lat
  let lon

  useEffect(() => {
    countryWeather
      .getCoor(filteredList[0].capital)
      .then(data => {
        lat = data[0].lat
        lon = data[0].lon
      })
      .then(() => {
        console.log("getWeather() executed")
        countryWeather.getWeather(lat, lon)
        .then(data => {
          setWeather(data)
        })
        .catch(error =>
          console.log("Error in getWeather()")
        )
      })
      .catch(error =>
        console.log("Error in getCoor()")
      )
  }, [])

  console.log("CountryInfo component loads")
  console.log("Weather", weather)

  const selectedCountry = filteredList.map(country => {
    return (
      <div key={country.name.common}>
        <h1> {country.name.common} </h1>
        <div> capital {country.capital} </div>
        <div> area {country.area} </div>
        <h3> languages: </h3>
        <ul>
          {Object.values(country.languages).map(lan =>
            <li key={lan}> {lan} </li>
          )}
        </ul>
        <img src={country.flags.png} />
      </div>
    )
  })
  
  return (
    <div>
      {selectedCountry}
      <ShowWeather
      weather={weather}
      />
    </div>
  )
}

export default CountryInfo