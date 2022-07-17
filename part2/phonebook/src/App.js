import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
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
      />
      <h3>Numbers</h3>
      <Persons persons={contactsToshow} />
    </div>
  );
};

export default App;
