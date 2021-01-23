const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  progress: {
    type: Number,
    default: 0,
    required: true
  },
  class_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

module.exports = mongoose.model('tasks', taskSchema)