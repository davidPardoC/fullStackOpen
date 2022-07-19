import React from "react";
import personServices from "../services/person";

const Contact = ({ persons = [], onDeleteNote }) => {
  const deleteNote = (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      personServices.deleteNote(id).then(() => {
        onDeleteNote(id);
      });
    }
  };
  return (
    <ul>
      {persons.map((person) => (
        <li key={person.name}>
          {person.name} {person.number}
          <button
            onClick={() => {
              deleteNote(person.id, person.name);
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
