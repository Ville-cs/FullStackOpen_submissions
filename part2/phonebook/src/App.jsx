import { useState, useEffect } from 'react'
import SearchFilter from './components/SearchFilter'
import ShowEntries from './components/ShowEntries'
import AddEntries from './components/AddEntries'
import noteService from './services/noteService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState([])
  const [newNumber, setNewNumber] = useState([])
  const [newSearch, setNewSearch] = useState("")

  useEffect(() => {
    console.log('effect')
    noteService
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
    })
    }, [])

  const handleName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
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