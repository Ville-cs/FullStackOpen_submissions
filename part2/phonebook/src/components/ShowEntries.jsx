import noteService from "../services/noteService"

const ShowEntries = ({ newSearch, persons, setPersons }) => {
  const whoToShow = !newSearch
  ? persons
  : persons.filter(person =>
    person.name.toLowerCase().includes(newSearch.toLowerCase()))

const handleDelete = (id) => {
  window.confirm("Delete this number?")
  noteService
    .remove(id)
    .then(
      console.log("Deleted entry"),
      setPersons(persons.filter(person => person.id !== id))
    )
    .catch(error =>
      console.log("Error while deleting")
    )
  }

  return (
    <div>
      {whoToShow.map(person =>
        <div key={person.id}>
          {person.name} {person.number}
          <button onClick={() => handleDelete(person.id)}>delete</button>
        </div>)}
    </div>
  )
}

export default ShowEntries