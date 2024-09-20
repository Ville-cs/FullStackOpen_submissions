import { useState, useEffect } from 'react'
import countries from './services/countries'
import SearchField from './components/SearchField'

function App() {
  const [country, setCountry] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    countries
      .getMatching()
      .then(allCountries => {
        setCountry(allCountries)
      })
      .catch(error =>
        console.log("Couldn't retrieve data")
      )
  }, [])

  const handleSearch = () => {
    setSearch(event.target.value)
  }

  return (
   <div>
    <SearchField
      search={search}
      handleSearch={handleSearch}
      country={country}
    />
   </div>
  )
}

export default App