const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 5
  },
  important: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true })

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    if (returnedObject.createdAt) returnedObject.createdAt = returnedObject.createdAt.toISOString()
    if (returnedObject.updatedAt) returnedObject.updatedAt = returnedObject.updatedAt.toISOString()
  }
})

module.exports = mongoose.model('Note', noteSchema)