require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const PORT = process.env.PORT

const Person = require('./models/person')

morgan.token('body', (req) =>
  req.method === 'POST' ? JSON.stringify(req.body) : ''
)

app.use(express.json())
app.use(morgan(':method :url :status - :response-time ms :body'))

app.use(express.static('build'))

app.get('/api/persons', (req, res) => {
  Person.find({}).then((people) => {
    res.json(people)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  const { id } = req.params
  Person.findById(id)
    .then((person) => {
      res.json(person)
    })
    .catch((err) => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  const { id } = req.params
  Person.findByIdAndDelete(id)
    .then(() => {
      res.status(204).end()
    })
    .catch((err) => next(err))
})

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body

  const person = new Person({ name, number, date: new Date() })
  person
    .save()
    .then((person) => {
      res.status(201).json(person)
    })
    .catch((err) => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body
  const { id } = req.params
  Person.findByIdAndUpdate(
    id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((updatedPerson) => {
      res.json(updatedPerson)
    })
    .catch((err) => next(err))
})

const errorHandler = (err, req, res, next) => {
  console.log(err.message)
  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'id malformed' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  } else if (err.code === 11000) {
    return res.status(429).json({ error: err.message })
  }
  next(err)
}

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
