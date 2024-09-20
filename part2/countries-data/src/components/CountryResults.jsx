import CountryInfo from "./CountryInfo"
import SearchedCountries from "./SearchedCountries"

const CountryResults = ({ country, search }) => {

  const filteredList = country.filter(currentCountry =>
    currentCountry.name.common.toLowerCase().includes(search.toLowerCase())
  )

  const listCountries = () => {
    if (filteredList.length > 10 || filteredList.length === 0) {
      return "specify your search"
    } else if (filteredList.length <= 10 && filteredList.length !== 1) {
      return <SearchedCountries
        filteredList={filteredList}
      />
    } else {
      return <CountryInfo
        filteredList={filteredList}
      />
    }
  }
  console.log("CountryResults component loads");

  return (
    <div>
      {listCountries()}
    </div>
  )
}

export default CountryResults