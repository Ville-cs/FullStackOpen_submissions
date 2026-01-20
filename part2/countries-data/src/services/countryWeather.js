import axios from 'axios'

const api_key = import.meta.env.VITE_API_KEY

const getWeather = (lat, lon) => {
  const request = axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`,
  )
  return request.then(response => response.data)
}

const getCoor = capital => {
  const request = axios.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=${capital}&limit=1&appid=${api_key}`,
  )
  return request.then(response => response.data)
}

const getIcon = code => {
  const request = axios.get(`https://openweathermap.org/img/wn/${code}@2x.png`)
  return request.then(response => response.data)
}

export default { getWeather, getCoor, getIcon }
