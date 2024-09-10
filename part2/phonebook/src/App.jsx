import { useState } from 'react'
import SearchFilter from './components/SearchFilter'
import ShowEntries from './components/ShowEntries'
import AddEntries from './components/AddEntries'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [newSearch, setNewSearch] = useState("")

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
      />
    </div>
  )
}

export default App