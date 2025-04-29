require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')
const { errorHandler, unknownEndpoint } = require('./middleware/errorHandler')

const app = express()

morgan.token('post-data', (req) => {
  if (req.method === 'POST' && req.body) {
    return `{ name: '${req.body.name}', number: '${req.body.number}'${req.body.id ? `, id: ${req.body.id}` : ''} }`
  }
  return ''
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'ID mal formateado' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'))

app.use(morgan('tiny'))
app.use(express.json())
app.use(express.static('dist'))

app.get('/', (request, response) => {
    response.send('<h1>it should work</h1>')
})

app.get('/info', (request, response) => {
  const total = persons.length
  const today = new Date()
  const todayString = today.toLocaleString()

  response.send(`
    <p>Phonebook has info for ${total} people</p>
    <p>${todayString}</p>
    `)
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      if (result) {
        response.status(204).end()
      } else {
        response.status(404).json({ error: 'person not found' })
      }
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({ error: 'name missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})