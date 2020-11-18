const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.json())

// Morgan middleware
// Log all requests to console

morgan.token('namee', function (req,res) {
  return req.body['name']
})

morgan.token('number', function (req,res) {
  return req.body['number']
})

app.use(morgan(':method :url { :namee , :number }', {
  skip: function (req,res) { return false} 
}))



// Hardcoded list of data
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

  }

]


// PAGES 

// Root page 
app.get('/', (request, response) => {
  response.send('<h1>Nothing here for now!</h1>') 
})

// Info page 
app.get('/info', (request, response) => {
  let bookLength = persons.length 
  response.send(`<p>Phonebook has info for ${bookLength} people. </p> <p>${new Date()}</p>`)
})

// HTTP Requests 

// HTTP GET Request for persons 
app.get('/api/persons', (request, response) => {
  response.send(persons)
})

// HTTP GET Request for a single person's entry in the phonebook
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  
  if(person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

// HTTP DELETE Request for a single person's entry in the phonebook 
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id) 
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

// Function to generate random ID
const getId = () => {
  return Math.floor(Math.random()*1000)
}

// HTTP POST Request to add a single person's entry into the phonebook
app.post('/api/persons', (request, response) => {
  const body = request.body 

  if(!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }

  if(!body.name) {
    return response.status(400).json({
      error: 'number missing'
    })
  }

  if(persons.filter(person => person.name === body.name).length > 0) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: getId()
  }

  persons = persons.concat(person) 

  response.json(person)

})

// PORT definition
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})