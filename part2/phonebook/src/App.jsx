import { useState } from 'react';
import Person from './components/Person';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda

  const addPerson = (event) => {
    event.preventDefault();
    
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1 // Generar un ID único
    };
    
    setPersons(persons.concat(personObject));
    setNewName('');
    setNewNumber('');
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Actualizar el término de búsqueda
  };

  // Filtrar las personas según el término de búsqueda
  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <div>
          filter shown with: <input
            value={searchTerm} 
            onChange={handleSearchChange}
          />
        </div>
        <h2>add a new</h2>
        <form onSubmit={addPerson}>
          <div>
            name: <input 
              value={newName}
              onChange={handleNameChange}
            />
          </div>
          <div>
            number: <input 
              value={newNumber}
              onChange={handleNumberChange}  
            />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        <div>
          {personsToShow.map(person =>
            <Person key={person.id} person={person}/> // Usar el ID como clave
          )}
        </div>
      </div>
    </>
  );
};

export default App;