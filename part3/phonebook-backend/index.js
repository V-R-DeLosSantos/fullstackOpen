require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

morgan.token('post-data', (req) => {
  if (req.method === 'POST' && req.body) {
    return `{ name: '${req.body.name}', number: '${req.body.number}'${req.body.id ? `, id: ${req.body.id}` : ''} }`
  }
  return ''
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'))

let persons = []

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

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  console.log('success')
  response.status(204).end()
})

/*const makeId = () => {
  let newID
  do {
    newID = Math.floor(Math.random() * 15) 
  } while (persons.some(person => person.id === newID))
  return newID
}*/

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

const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})