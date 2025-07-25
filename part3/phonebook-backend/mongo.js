const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

/*const url =
    `mongodb+srv://vrdelossantos:############@cluster0.3rh5nm8.mongodb.net/PhonebookApp?retryWrites=true&w=majority&appName=Cluster0`*/

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    minlength: 3,
    required: true
  },
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })

} else if (process.argv.length === 5) {
  
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  person.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  console.log('To show all people: node mongo.js <password>')
  console.log('To add a new person: node mongo.js <password> <name> <number>')
  process.exit(1)
}

