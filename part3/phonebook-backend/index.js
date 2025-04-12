const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use(cors())

app.use(express.json())

morgan.token('post-data', (req) => {
  if (req.method === 'POST' && req.body) {
    return `{ name: '${req.body.name}', number: '${req.body.number}'${req.body.id ? `, id: ${req.body.id}` : ''} }`
  }
  return ''
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(morgan('tiny'))

app.use(express.json())

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
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find (person => person.id === id)
  if  (person) {
    response.json (person)
  } else {
    console.log('x')
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  console.log('success')
  response.status(204).end()
})

const makeId = () => {
  let newID
  do {
    newID = Math.floor(Math.random() * 15) 
  } while (persons.some(person => person.id === newID))
  return newID
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number is missing'
    })
  }

  const nameExists = persons.some(person => person.name === body.name);
  if (nameExists) {
    return response.status(400).json({
      error: 'name must be unique'
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: makeId()
  }

  persons = persons.concat(person)

  console.log(person)
  response.json(person)

})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})