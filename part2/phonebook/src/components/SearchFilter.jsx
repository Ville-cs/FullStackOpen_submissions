const SearchFilter = ({ newSearch, setNewSearch, handleSearch, persons }) => {

  return (
    <>
      search for <input
      value={newSearch}
      onChange={handleSearch}
      />
    </>
  )

}

export default SearchFilter