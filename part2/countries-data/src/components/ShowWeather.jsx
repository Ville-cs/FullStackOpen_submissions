const ShowWeather = ({ weather }) => {

  if (weather === null) {
    return
  }

  return (
    <div>
      <p>temperature now {weather.main.temp} Celsius </p>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather icon"></img>
      <p>wind {weather.wind.speed} m/s </p>
    </div>
  )
}

export default ShowWeather