import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personServices from "./services/person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");

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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        onChange={(filter) => {
          setFilter(filter);
        }}
      />
      <h3>Add new</h3>
      <PersonForm
        persons={persons}
        onAddNote={(person) => {
          setPersons(persons.concat([person]));
        }}
        onUpdate={(updatedPerson) => {
          const idx = persons.findIndex(
            (person) => person.id === updatedPerson.id
          );
          const updatedPersons = [...persons];
          updatedPersons[idx] = updatedPerson;
          setPersons(updatedPersons);
        }}
      />
      <h3>Numbers</h3>
      <Persons
        persons={contactsToshow}
        onDeleteNote={(id) => {
          setPersons(persons.filter((person) => person.id !== id));
        }}
      />
    </div>
  );
};

export default App;
