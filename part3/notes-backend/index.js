const express = require("express");
const app = express();
const PORT = 3001;

const persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  return res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = persons.findIndex((person) => person.id === id);
  if (index < 0) {
    return res.status(404).send();
  }
  return res.json(persons[index]);
});

app.get("/info", (req, res) => {
  return res.send(
    `<div>
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
    </div>`
  );
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
