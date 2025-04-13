import { useState, useEffect } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Search from './components/Search'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  },[])

  const addPerson = (event) => {
    event.preventDefault()
    
    const existingPerson = persons.find(person => person.name === newName)
    
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber }
        
        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => 
              person.id !== existingPerson.id ? person : returnedPerson
            ))
            setNewName('')
            setNewNumber('')
            setMessage(`Updated ${returnedPerson.name}'s number`)
            setTimeout(() => setMessage(null), 5000)
          })
          .catch(error => {
            setMessage(`Error: ${error.response.data.error || 'Failed to update person'}`)
            setTimeout(() => setMessage(null), 5000)
            setPersons(persons.filter(n => n.id !== existingPerson.id))
          })
      }
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
        setMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => setMessage(null), 5000)
      })
      .catch(error => {
        setMessage(`Error: ${error.response.data.error || 'Failed to add person'}`)
        setTimeout(() => setMessage(null), 5000)
      })
  }

  const removePerson = id => {
    const person = persons.find(n => n.id === id)

    if(window.confirm(`Delete ${person.name}?`)){

      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setMessage(`Deleted ${person.name}`)
          setTimeout(() => setMessage(null), 5000)
        })
        .catch(error => {
          setMessage(`Error: Failed to delete ${person.name}`)
          setTimeout(() => setMessage(null), 5000)
          personService.getAll().then(setPersons)
        })

    }
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
    person.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <Search searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
        <h3>add a new</h3>
        <Notification message={message} isError={message?.includes('Error')} />
        <PersonForm 
          newName={newName} 
          newNumber={newNumber} 
          handleNameChange={handleNameChange} 
          handleNumberChange={handleNumberChange} 
          addPerson={addPerson} 
        />
        <h3>Numbers</h3>
        <div>
        {personsToShow.map(person =>
          <Person
            key={person.id}  // <- Usar id en lugar del índice
            person={person}
            removePerson={() => removePerson(person.id)}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default App