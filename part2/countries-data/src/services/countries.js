import axios from 'axios'
const allCountriesUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const singleCountryUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name'

const getMatching = () => {
  const request = axios.get(allCountriesUrl)
  return request.then(response => response.data)
}

const getCountry = (name) => {
  const request = axios.get(`${singleCountryUrl}/${name}`)
  return request.then(response => response.data)
}

export default { getMatching, getCountry }