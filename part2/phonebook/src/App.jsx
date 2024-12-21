/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import PersonForm from "./components/PersonForm";
import PersonList from "./components/PersonList";
import phonebookService from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [currentStatus, setCurrentStatus] = useState("success");

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setNewFilter(event.target.value);

  useEffect(() => {
    phonebookService.getAll().then((initialData) => setPersons(initialData));
  }, []);

  const updatePersons = (newPersons) => {
    setPersons(newPersons);
  };

  const emptyForm = () => {
    setNewName("");
    setNewNumber("");
  };

  const showNotification = (message, status) => {
    setCurrentStatus(status);
    setNotificationMessage(message);

    setTimeout(() => {
      setNotificationMessage("");
    }, 5000);
  };

  const createPerson = () => {
    const newPersonData = {
      name: newName,
      number: newNumber,
      id: String(Date.now()),
    };
    setNewName("");
    setNewNumber("");

    phonebookService
      .create(newPersonData)
      .then((returnedPersonData) => {
        const updatedPersons = persons.concat(returnedPersonData);
        updatePersons(updatedPersons);
        showNotification(
          `Information of '${newPersonData.name}' has been successfully added`,
          "success"
        );
      })
      .catch((error) => console.log(error.response.data.error));
  };
  const updatePerson = (id, newPersonData) => {
    phonebookService.update(id, newPersonData).then(() => {
      const updatedPersons = persons.map((person) =>
        person.id !== id ? person : newPersonData
      );
      updatePersons(updatedPersons);
      showNotification(
        `Information of '${newPersonData.name}' has been successfully updated`,
        "success"
      );
    });
  };
  const removePerson = (id) => {
    const personData = persons.find((person) => person.id === id);
    phonebookService
      .remove(id)
      .then(() => {
        const updatedPersons = persons.filter((person) => person.id !== id);
        updatePersons(updatedPersons);
        showNotification(
          `Information of '${personData.name}' has been successfully deleted`,
          "success"
        );
      })
      .catch((error) => {
        showNotification(
          `Information of '${personData.name}' has already been removed from server`,
          "error"
        );
      });
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
        updatePerson(personWithSameName.id, {
          id: personWithSameName.id,
          name: personWithSameName.name,
          number: newNumber,
        });
        emptyForm();
        return;
      }
      return;
    } else if (personWithSameNumber) {
      if (window.confirm(`Update ${personWithSameNumber.number}'s name?`)) {
        updatePerson(personWithSameNumber.id, {
          id: personWithSameNumber.id,
          name: newName,
          number: personWithSameNumber.number,
        });
        emptyForm();
        return;
      }
      return;
    }
    createPerson();
    emptyForm();
  };

  const filterPersons = (persons, newFilter) => {
    if (newFilter === "") return persons;

    return persons.filter((person) =>
      person.name.toLowerCase().includes(newFilter.toLowerCase())
    );
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notificationMessage} status={currentStatus} />
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
        handleDelete={removePerson}
      />
    </div>
  );
};

export default App;
