require('dotenv').config()
const express = require('express')
const Note = require('./models/note')

const app = express()

let notes = []

app.use(express.json())
app.use(express.static('dist'))

app.post('/api/notes', (request, response) => {
  const body = request.body
  
  if(!body.content) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note ({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note =>  {response.json(note)})
})

app.delete('/api/notes/:id', (request, response) => {
  Note.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
