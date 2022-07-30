const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  )
}

const password = process.argv[2]

const url = `mongodb+srv://davidPardoC:${password}@cluster0.kt24p.mongodb.net/noteApp?retryWrites=true&w=majority`

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

mongoose
  .connect(url)
  .then(() => {
    console.log('DB Connected')

    const note = new Note({
      content: 'Html is easy',
      date: new Date(),
      important: true,
    })

    return note.save()
  })
  .then(() => {
    console.log('Note saved')
    return mongoose.connection.close()
  })
  .catch((err) => {
    console.log(err)
  })
