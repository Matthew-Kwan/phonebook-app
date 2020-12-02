require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')


app.use(express.json())
app.use(express.static('build'))
app.use(cors())

// Error Handling middleware
const errorHandler = (error, request, response, next) => {
  console.error(error.message) 

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

// Morgan middleware
// // Log all requests to console

// morgan.token('namee', function (req,res) {
//   return req.body['name']
// })

// morgan.token('number', function (req,res) {
//   return req.body['number']
// })

// app.use(morgan(':method :url { :namee , :number }', {
//   skip: function (req,res) { return false} 
// }))

// END of MORGAN



// PAGES 

// Root page 
app.get('/', (request, response) => {
  response.send('<h1>Nothing here for now!</h1>') 
})

// Info page [TO FIX] No longer works after MongoDB integration (probably)
app.get('/info', (request, response) => {
  let bookLength = Person.length - 1
  response.send(`<p>Phonebook has info for ${bookLength} people. </p> <p>${new Date()}</p>`)
})

// HTTP Requests 

// HTTP GET Request for persons 
app.get('/api/persons', (request, response) => {
  Person.find({}).then(phones => {
    console.log(phones)
    response.json(phones)
  })
})

// HTTP GET Request for a single person's entry in the phonebook
app.get('/api/persons/:id', (request, response, next ) => {
    Person.findById(request.params.id).then(person => {
      if (person) {
        response.json(person) 
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

// HTTP DELETE Request for a single person's entry in the phonebook 
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id) 
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

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

  // HTTP PUT Request for updating a phonebook entry 
  app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body 

    const person = {
      name: body.name,
      number: body.number,
    }

    Person.findById(request.params.id).then(person => {
      console.log(person)
    })
    
    Person.findByIdAndUpdate(request.params.id, person, {new: true})
      .then(updatedPerson => {
        response.json(updatedPerson) 
      })
      .catch(error => next(error))
  })
  
  // Previous condition for not allowing non-unique names 
  // if(persons.filter(person => person.name === body.name).length > 0) {
  //   return response.status(400).json({
  //     error: 'name must be unique'
  //   })
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })

})

// PORT definition
const PORT = process.env.PORT || 3001 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})