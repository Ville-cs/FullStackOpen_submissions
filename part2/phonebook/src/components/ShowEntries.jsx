const ShowEntries = ({ newSearch, persons }) => {
  const whoToShow = !newSearch
  ? persons
  : persons.filter(person =>
    person.name.toLowerCase().includes(newSearch.toLowerCase()))


  return (
    <div>
      {whoToShow.map(person =>
        <div key={person.number}>
          {person.name} {person.number}
        </div>)}
    </div>
  )
}

export default ShowEntries