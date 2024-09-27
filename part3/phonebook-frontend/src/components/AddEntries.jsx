import noteService from "../services/noteService"

const AddEntries = ({
  persons, newName, newNumber,
  setPersons, setNewName, setNewNumber,
  handleName, handleNumber, setAddMessage,
  setErrorMessage
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
            setNewName("")
            setNewNumber("")
          })
          .catch(error => {
            setErrorMessage(`${newName} no longer exists`)
          }
          )
          return
      } else {return}
    }

    noteService
      .create(nameObject)
      .then(returnedPerson => {
        setAddMessage(`Added ${newName}`)
        setPersons(persons.concat(returnedPerson))
        setNewName("")
        setNewNumber("")
      })
      .catch(error => {
        console.log(error.response.data.error)
        setErrorMessage(error.response.data.error)
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