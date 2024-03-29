import React from "react";
import personServices from "../services/person";

const Contact = ({ persons = [], onDeleteNote, onDeleteError }) => {
  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      personServices
        .deletePerson(id)
        .then(() => {
          onDeleteNote(id);
        })
        .catch((error) => onDeleteError(error));
    }
  };
  return (
    <ul>
      {persons.map((person) => (
        <li key={person.name}>
          {person.name} {person.number}
          <button
            onClick={() => {
              deletePerson(person.id, person.name);
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Contact;
