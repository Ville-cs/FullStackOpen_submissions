import { useState, useEffect } from 'react'
import SearchFilter from './components/SearchFilter'
import ShowEntries from './components/ShowEntries'
import AddEntries from './components/AddEntries'
import noteService from './services/noteService'
import SuccessfulAdd from './components/SuccessfulAdd'
import ErrorMessage from './components/ErrorMessage'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState([])
  const [newNumber, setNewNumber] = useState([])
  const [newSearch, setNewSearch] = useState("")
  const [addMessage, setAddMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
    })
    }, [])

  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setNewSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div style={{margin: "10px 5px"}}>
        <SuccessfulAdd
          addMessage={addMessage}
          setAddMessage={setAddMessage}
        />
        <ErrorMessage
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      </div>
      <div>
        <SearchFilter
          newSearch={newSearch}
          setNewSearch={setNewSearch}
          handleSearch={handleSearch}
          persons={persons} />
      </div>
      <h2>Add new contact</h2>
      <AddEntries
        persons={persons}
        newName={newName}
        newNumber={newNumber}
        setPersons={setPersons}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        handleName={handleName}
        handleNumber={handleNumber}
        setAddMessage={setAddMessage}
        setErrorMessage={setErrorMessage}
      />
      <h2>Numbers</h2>
      <ShowEntries
        newSearch={newSearch}
        persons={persons}
        setPersons={setPersons}
      />
    </div>
  )
}

export default App