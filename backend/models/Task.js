const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TaskSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  list: {
    type: Schema.Types.ObjectId,
    required: true
  },
  name: { 
    type: String,
    required: true
  },
  numOfCheckpoints: {
    type: Number,
    required: true
  },
  currentCheckpoints: {
    type: Number,
    required: true,
    default: 0
  }
})

module.exports = mongoose.model('Task', TaskSchema)