/* eslint-disable react/prop-types */
import { useState } from "react";

const Filter = ({ value, handleChange }) => {
  return (
    <div>
      filter shown with <input value={value} onChange={handleChange} />
    </div>
  );
};

const PersonForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number:
        <input
          type="tel"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          value={props.newNumber}
          onChange={props.handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const PersonList = ({ persons, filterPersons, newFilter }) => {
  const filteredPersons = filterPersons(persons, newFilter);
  return (
    <ul>
      {filteredPersons.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}
        </li>
      ))}
    </ul>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123-2156", id: 1 },
    { name: "Ada Lovelace", number: "391-441-5323", id: 2 },
    { name: "Dan Abramov", number: "123-234-7345", id: 3 },
    { name: "Mary Poppendieck", number: "392-642-3129", id: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setNewFilter(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newName === "" || newNumber === "") {
      alert("Please enter a name and number");
      setNewName("");
      setNewNumber("");
      return;
    }
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    if (persons.some((person) => person.number === newNumber)) {
      alert(`${newNumber} is already added to phonebook`);
      return;
    }
    setPersons([...persons, { id: Date.now(), name: newName, number: newNumber }]);
    setNewName("");
    setNewNumber("");
  };

  const filterPersons = (persons, newFilter) => {
    if (newFilter === "") return persons;

    return persons.filter((person) => person.name.toLowerCase().includes(newFilter));
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter value={newFilter} handleChange={handleFilterChange} />

      <h2>Add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      {persons.length > 0 && (
        <PersonList
          persons={persons}
          filterPersons={filterPersons}
          newFilter={newFilter}
        />
      )}
    </div>
  );
};

export default App;
