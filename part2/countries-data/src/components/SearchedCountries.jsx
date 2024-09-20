import CountryInfo from "./CountryInfo";
import { useState } from "react";

const SearchedCountries = ({ filteredList }) => {
  const [selected, setSelected] = useState(null)

  if (selected !== null) {
    const newArray = [selected]
    return <CountryInfo
      filteredList={newArray}
    />
  }

  const countryList = filteredList.map(country => {
    return (
      <div key={country.name.common}>
        <> {country.name.common} </>
        <button onClick={()=> {
          setSelected(country)
        }}>
          show
        </button>
      </div>
    )
  })
  console.log("SearchedCountries component loads");
  

  return (
    <div>
      {countryList}
    </div>
  )
}

export default SearchedCountries