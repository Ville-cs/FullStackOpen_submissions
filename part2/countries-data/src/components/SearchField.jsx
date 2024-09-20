import CountryResults from "./CountryResults"

const SearchField = ({ search, country, handleSearch }) => {

  return (
    <div>
      find countries <input
      value={search}
      onChange={handleSearch}
      />
      <CountryResults
      country={country}
      search={search}
      />
    </div>
  )
}

export default SearchField