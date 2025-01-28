import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Search from './components/Search'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  },[])

  const addPerson = (event) => {
    event.preventDefault()
    
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    
    const personObject = {
      name: newName,
      number: newNumber, 
    }
    
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  } 

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <Search searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
        <h3>add a new</h3>
        <PersonForm 
          newName={newName} 
          newNumber={newNumber} 
          handleNameChange={handleNameChange} 
          handleNumberChange={handleNumberChange} 
          addPerson={addPerson} 
        />
        <h3>Numbers</h3>
        <div>
          {personsToShow.map((person, i) =>
            <Person
             key={i}
             person={person}
             />
          )}
        </div>
      </div>
    </>
  )
}

export default App