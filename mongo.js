const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstackopen:${password}@cluster0.tycaz.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Phone', phoneSchema)

// The user calls this script with only the password argument 
if (process.argv.length === 3) {
  try {
    Person.find({}).then(result => {
      result.forEach(person => {
        console.log(person) 
      })
      
      mongoose.connection.close() 
    })
    
  } catch (err) {
    console.log(err);
  }

// If the user calls the script with a new person and number 
} else if (process.argv.length === 5) {

  let name = process.argv[3] 
  let number = process.argv[4]

  // Define the new object 
  const person = new Person({
    name: name,
    number: number 
  })
  
  person.save().then(result => {
    console.log(`You have successfully added ${name} to your phonebook with the number: ${number}!`)
    mongoose.connection.close()
  })


}
