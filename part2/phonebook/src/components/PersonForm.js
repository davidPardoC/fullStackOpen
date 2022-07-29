import React, { useState } from "react";
import personServices from "../services/person";

const PersonForm = ({ persons, onAddNote, onUpdate }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    if (!newName || !newNumber) {
      return;
    }
    const personIdx = persons.findIndex(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    if (personIdx >= 0) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number`
        )
      ) {
        personServices
          .updatePerson(persons[personIdx].id, {
            ...persons[personIdx],
            number: newNumber,
          })
          .then((person) => {
            onUpdate(person);
          })
          .catch((error) => {
            onAddNote({}, error.response.data.error);
          });
      }
      return;
    }
    const newPerson = { name: newName, number: newNumber };
    personServices
      .addPerson(newPerson)
      .then((person) => {
        onAddNote(person);
      })
      .catch((error) => {
        onAddNote({}, error.response.data.error);
      });
    setNewName("");
    setNewNumber("");
  };

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
