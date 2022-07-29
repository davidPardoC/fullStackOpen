require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT;

const Person = require("./models/person");

morgan.token("body", (req, res) =>
  req.method === "POST" ? JSON.stringify(req.body) : ""
);

app.use(express.json());
app.use(morgan(":method :url :status - :response-time ms :body"));

app.use(express.static("build"));

app.get("/api/persons", (req, res) => {
  Person.find({}).then((people) => {
    res.json(people);
  });
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = persons.findIndex((person) => person.id === id);
  if (index < 0) {
    return res.status(404).send();
  }
  return res.json(persons[index]);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  return res.status(204).send();
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;
  if (!name || !number) {
    return res.status(400).send();
  }
  const person = new Person({ name, number, date: new Date() });
  person.save().then((person) => {
    res.status(201).json(person);
  });
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
