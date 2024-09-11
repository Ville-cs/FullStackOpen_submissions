import noteService from "../services/noteService"

const AddEntries = ({
  persons, newName, newNumber,
  setPersons, setNewName, setNewNumber,
  handleName, handleNumber
  }) => {
  const addNote = (event) => {
    event.preventDefault()
      const nameObject = {
        name: newName,
        number: newNumber
      }
    if (persons.find(person => nameObject.number === person.number)) {
      if (window.confirm(`${newNumber} already added: continue`)) {
        const oldPerson = persons.find(person => nameObject.number === person.number)
        noteService
          .update(oldPerson.id, nameObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== oldPerson.id ? person : returnedPerson))
          })
          return
      } else {return}
    }

    noteService
      .create(nameObject)
      .then(returnedNote => {
        setPersons(persons.concat(returnedNote))
        setNewName("")
        setNewNumber("")
      })
      .catch(error => {
        alert(
          "failed to create new person"
        )
      })
  }

  return (
    <form onSubmit={addNote}>
      <div>
        name: <input
        value={newName}
        onChange={handleName}
        />
      </div>
      <div>
        number: <input
        value={newNumber}
        onChange={handleNumber}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default AddEntries