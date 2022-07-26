import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personServices from "./services/person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState();

  useEffect(() => {
    personServices.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const contactsToshow = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  const hideNotification = () => {
    setTimeout(() => {
      setNotification({});
    }, 1000);
  };

  const onAddPerson = (person) => {
    setPersons(persons.concat([person]));
    setNotification({ message: `Person ${person.name} Added`, error: false });
    hideNotification();
  };

  const onUpdatePerson = (updatedPerson) => {
    const idx = persons.findIndex((person) => person.id === updatedPerson.id);
    const updatedPersons = [...persons];
    updatedPersons[idx] = updatedPerson;
    setPersons(updatedPersons);
    setNotification({
      message: `Person ${updatedPerson.name} updated`,
      error: false,
    });
    hideNotification();
  };

  const onDeleteError = (error) => {
    if (error.response.status === 404) {
      setNotification({
        message: `Person already deleted`,
        error: true,
      });
    }
    hideNotification();
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter
        onChange={(filter) => {
          setFilter(filter);
        }}
      />
      <h3>Add new</h3>
      <PersonForm
        persons={persons}
        onAddNote={onAddPerson}
        onUpdate={onUpdatePerson}
      />
      <h3>Numbers</h3>
      <Persons
        persons={contactsToshow}
        onDeleteNote={(id) => {
          setPersons(persons.filter((person) => person.id !== id));
        }}
        onDeleteError={onDeleteError}
      />
    </div>
  );
};

export default App;
