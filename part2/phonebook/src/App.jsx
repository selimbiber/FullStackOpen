/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";

const baseUrl = "http://localhost:3001/persons";

const phonebookService = {
  getAll: () => {
    return axios.get(baseUrl).then((res) => res.data);
  },
  create: (newPersonData) => {
    return axios.post(baseUrl, newPersonData).then((res) => res.data);
  },
  update: (id, newPersonData) => {
    return axios.put(`${baseUrl}/${id}`, newPersonData).then((res) => res.data);
  },
  delete: (id) => {
    return axios.delete(`${baseUrl}/${id}`).then((res) => res.data);
  },
};

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

const PersonList = ({ persons, filterPersons, newFilter, handleDelete }) => {
  const filteredPersons = filterPersons(persons, newFilter);
  return (
    <ul>
      {filteredPersons.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => handleDelete(person.id)}>delete</button>
        </li>
      ))}
    </ul>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    phonebookService.getAll().then((initialData) => setPersons(initialData));
  }, []);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setNewFilter(event.target.value);

  const emptyForm = () => {
    setNewName("");
    setNewNumber("");
  };

  const phonebook = {
    create: () => {
      const newPersonData = {
        name: newName,
        number: newNumber,
        id: String(Date.now()),
      };
      setNewName("");
      setNewNumber("");

      phonebookService.create(newPersonData).then((returnedPersonData) => {
        setPersons(persons.concat(returnedPersonData));
      });
    },
    update: (id, newPersonData) => {
      phonebookService.update(id, newPersonData).then(() => {
        setPersons(persons.map((person) => (person.id !== id ? person : newPersonData)));
      });
    },
    delete: (id) => {
      phonebookService.delete(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    },
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newName === "" || newNumber === "") {
      alert("Please enter a name and number");
      return;
    }

    const personWithSameName = persons.find((person) => person.name === newName);
    const personWithSameNumber = persons.find((person) => person.number === newNumber);

    if (personWithSameName) {
      if (window.confirm(`Update ${personWithSameName.name}'s number?`)) {
        phonebook.update(personWithSameName.id, {
          id: personWithSameName.id,
          name: personWithSameName.name,
          number: newNumber,
        });
        emptyForm();
        return;
      }
    } else if (personWithSameNumber) {
      if (window.confirm(`Update ${personWithSameNumber.number}'s name?`)) {
        phonebook.update(personWithSameNumber.id, {
          id: personWithSameNumber.id,
          name: newName,
          number: personWithSameNumber.number,
        });
        emptyForm();
        return;
      }
    }
    phonebook.create();
    emptyForm();
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
      <PersonList
        persons={persons}
        filterPersons={filterPersons}
        newFilter={newFilter}
        handleDelete={phonebook.delete}
      />
    </div>
  );
};

export default App;
